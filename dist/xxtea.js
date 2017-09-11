(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["dx"] = factory();
	else
		root["dx"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

// http://www.ruanyifeng.com/blog/2014/12/unicode.html
//
// UTF-8是一种变长的编码方法，字符长度从1个字节到4个字节不等
// UTF-16编码介于UTF-32与UTF-8之间，同时结合了定长和变长两种编码方法的特点。
// 它的编码规则很简单：基本平面的字符占用2个字节，辅助平面的字符占用4个字节。

// https://en.wikipedia.org/wiki/UTF-8
// 0000 0000-0000 007F | 0xxxxxxx 7 bits, stored in 1 byte
// 0000 0080-0000 07FF | 110xxxxx 10xxxxxx 5+6 bits = 11 bits, stored in 2 bytes
// 0000 0800-0000 FFFF | 1110xxxx 10xxxxxx 10xxxxxx 4+6+6 bits = 16 bits, stored in 3 bytes
// 0001 0000-0010 FFFF | 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx


/**
 * Encode multi-byte Unicode string into utf-8 multiple single-byte characters
 * (BMP / basic multilingual plane only)
 *
 * Chars in range U+0080 - U+07FF are encoded in 2 chars, U+0800 - U+FFFF in 3 chars
 *
 */
function encode(str) {
    if (!str) {
        return '';
    }

    // U+0080 - U+07FF => 2 bytes 110yyyyy, 10zzzzzz
    // U+0800 - U+FFFF => 3 bytes 1110xxxx, 10yyyyyy, 10zzzzzz
    // 拆分后的单字节以1开头，utf8中没有在用
    return String(str).replace(
        /[\u0080-\u07ff]/g,
        function(c) {
            var cc = c.charCodeAt(0);
            return String.fromCharCode(0xc0 | cc >> 6, 0x80 | cc & 0x3f);
        }
    ).replace(
        /[\u0800-\uffff]/g,
        function(c) {
            var cc = c.charCodeAt(0);
            return String.fromCharCode(0xe0 | cc >> 12, 0x80 | cc >> 6 & 0x3f, 0x80 | cc & 0x3f);
        }
    );
}

function decode(str) {
    if (!str) {
        return '';
    }

    // 跟上面转换过的范围一一对应
    // note: decode 3-byte chars first as decoded 2-byte strings could appear to be 3-byte char!
    return str.replace(
        /[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g, // 3-byte chars
        function(c) { // (note parentheses for precence)
            var cc = ((c.charCodeAt(0) & 0x0f) << 12) | ((c.charCodeAt(1) & 0x3f) << 6) | (c.charCodeAt(2) & 0x3f);
            return String.fromCharCode(cc);
        }
    ).replace(
        /[\u00c0-\u00df][\u0080-\u00bf]/g, // 2-byte chars
        function(c) { // (note parentheses for precence)
            var cc = (c.charCodeAt(0) & 0x1f) << 6 | c.charCodeAt(1) & 0x3f;
            return String.fromCharCode(cc);
        }
    )
}

module.exports = {
    encode: encode,
    decode: decode
};


/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

/**
 * https://en.wikipedia.org/wiki/XXTEA
 * XXTEA是一种分组密码算法，其明文块为32比特，密钥长度为128比特
 * 以一个字符占8位计算
 * 在js中就是明文分成4个字符一组
 * 密钥应该是长度为16的字符
 */
var Utf8 = __webpack_require__(0);

function strToLongs(s, includeLength) {
    var l = new Array(Math.ceil(s.length / 4));
    for (var i = 0; i < l.length; i++) {
        // note little-endian encoding - endianness is irrelevant as long as
        // it is the same in longsToStr()
        l[i] = s.charCodeAt(i * 4) + (s.charCodeAt(i * 4 + 1) << 8) +
            (s.charCodeAt(i * 4 + 2) << 16) + (s.charCodeAt(i * 4 + 3) << 24);
    }
    if (includeLength) {
        l.push(s.length)
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

    var v = strToLongs(Utf8.encode(plaintext), true);

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
    // return base64.encode(ciphertext);
    return ciphertext;
}

function decrypt(ciphertext, password) {
    if (!ciphertext) {
        return '';
    }

    var v = strToLongs(ciphertext);
    // var v = strToLongs(base64.decode(ciphertext));
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

/***/ })

/******/ });
});