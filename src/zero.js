/**
 * 利用零宽字符隐藏，实际长度也会大大增加
 * http://unicode-table.com/en/search/?q=Zero+Width
 */
var Utf8 = require('./utf8');

// 0宽字符
var map = {
    '00': '\u200b',
    '01': '\u200c',
    '10': '\u200d',
    '11': '\uFEFF'
};
var reverseMap = {};

var key;
for (key in map) {
    if (map.hasOwnProperty(key)) {
        reverseMap[map[key]] = key;
    }
}

function encrypt(str) {
    if (!str) {
        return '';
    }

    // 转为单字节
    str = Utf8.encode(str);

    var s, ret = [];
    for (var i = 0; i < str.length; i++) {
        s = str.charCodeAt(i).toString(2);
        // 补足八位
        s = s.length < 8 ? new Array(9 - s.length).join('0') + s : s;

        // 每两位替换成一个字符
        ret.push(s.replace(/../g, function(k) {
            return map[k];
        }));
    }
    return ret.join('');
}

function decrypt(str) {
    if (!str) {
        return '';
    }

    // 每4个0宽字符要生成一个
    str = str.replace(/.{4}/g, function(s) {
        return String.fromCharCode(parseInt(s.replace(/./g, function(k) {
            return reverseMap[k];
        }), 2));
    });

    return Utf8.decode(str);
}

module.exports = {
    encrypt: encrypt,
    decrypt: decrypt
}