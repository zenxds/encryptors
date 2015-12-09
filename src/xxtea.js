/**
 * https://en.wikipedia.org/wiki/XXTEA
 * XXTEA是一种分组密码算法，其明文块为32比特，密钥长度为128比特
 * 以一个字符占8位计算
 * 在js中就是明文分成4个字符一组
 * 密钥应该是长度为16的字符
 */
var Utf8 = require('./utf8');
var base64 = require('./base64');

function strToLongs(s) {
    var l = new Array(Math.ceil(s.length / 4));
    for (var i = 0; i < l.length; i++) {
        // note little-endian encoding - endianness is irrelevant as long as
        // it is the same in longsToStr()
        l[i] = s.charCodeAt(i * 4) + (s.charCodeAt(i * 4 + 1) << 8) +
            (s.charCodeAt(i * 4 + 2) << 16) + (s.charCodeAt(i * 4 + 3) << 24);
    }
    return l;
}

function longsToStr(l) { // convert array of longs back to string
    var a = new Array(l.length);
    for (var i = 0; i < l.length; i++) {
        a[i] = String.fromCharCode(l[i] & 0xFF, l[i] >>> 8 & 0xFF,
            l[i] >>> 16 & 0xFF, l[i] >>> 24 & 0xFF);
    }

    return a.join('');
}

function encrypt(plaintext, password) {
    if (!plaintext) {
        return '';
    }

    var v = strToLongs(Utf8.encode(plaintext));

    // 算法不支持长度小于2，手动添加一个值
    if (v.length <= 1) {
        v[1] = 0;
    }

    // simply convert first 16 chars of password as key
    var k = strToLongs(Utf8.encode(password).slice(0, 16));
    var n = v.length;

    // ---- <TEA coding> ----

    var z = v[n - 1],
        y = v[0],
        delta = 0x9E3779B9;
    var mx, e, q = Math.floor(6 + 52 / n),
        sum = 0;

    while (q-- > 0) { // 6 + 52/n operations gives between 6 & 32 mixes on each word
        sum += delta;
        e = sum >>> 2 & 3;
        for (var p = 0; p < n; p++) {
            y = v[(p + 1) % n];
            mx = (z >>> 5 ^ y << 2) + (y >>> 3 ^ z << 4) ^ (sum ^ y) + (k[p & 3 ^ e] ^ z);
            z = v[p] += mx;
        }
    }

    // ---- </TEA> ----

    var ciphertext = longsToStr(v);

    // 使用unicode编码，base64等，只要在解码函数里能解出来就行
    return base64.encode(ciphertext);
}

function decrypt(ciphertext, password) {
    if (!ciphertext) {
        return '';
    }

    var v = strToLongs(base64.decode(ciphertext));
    var k = strToLongs(Utf8.encode(password).slice(0, 16));
    var n = v.length;

    // ---- <TEA decoding> ----

    var z = v[n - 1],
        y = v[0],
        delta = 0x9E3779B9;
    var mx, e, q = Math.floor(6 + 52 / n),
        sum = q * delta;

    while (sum != 0) {
        e = sum >>> 2 & 3;
        for (var p = n - 1; p >= 0; p--) {
            z = v[p > 0 ? p - 1 : n - 1];
            mx = (z >>> 5 ^ y << 2) + (y >>> 3 ^ z << 4) ^ (sum ^ y) + (k[p & 3 ^ e] ^ z);
            y = v[p] -= mx;
        }
        sum -= delta;
    }

    // ---- </TEA> ----
    var plaintext = longsToStr(v).replace(/\u0000/g, '');
    return Utf8.decode(plaintext);
}

module.exports = {
    encrypt: encrypt,
    decrypt: decrypt
};