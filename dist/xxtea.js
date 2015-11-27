(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * https://en.wikipedia.org/wiki/XXTEA
	 * XXTEA是一种分组密码算法，其明文块为32比特，密钥长度为128比特
	 * 以一个字符占8位计算
	 * 在js中就是明文分成4个字符一组
	 * 密钥应该是长度为16的字符
	 */
	var Utf8 = __webpack_require__(1);
	var base64 = __webpack_require__(2);

	// encode保证只有单字节的字符，但是也可以使用原生的encodeURIComponent来替代，这样可以不依赖Utf8库
	var encode = Utf8.encode;
	var decode = Utf8.decode;
	// base64也可以不依赖，使用encodeURIComponent等来替代

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

	    var v = strToLongs(encode(plaintext));

	    // 算法不支持长度小于2，手动添加一个值
	    if (v.length <= 1) {
	        v[1] = 0;
	    }

	    // simply convert first 16 chars of password as key
	    var k = strToLongs(encode(password).slice(0, 16));
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
	    var k = strToLongs(encode(password).slice(0, 16));
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
	    return decode(plaintext);
	}

	module.exports = {
	    encrypt: encrypt,
	    decrypt: decrypt
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	(function(global) {
	    // 如果不想依赖Utf8则可以使用原生的encodeURI
	    var Utf8 = __webpack_require__(1);

	    var nativeAtob = global.atob;
	    var nativeBtoa = global.btoa;
	    // code顺序可以自定义
	    var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

	    // http://www.webtoolkit.info/javascript-base64.html
	    var encode = nativeBtoa || function(input) {
	        if (!input) {
	            return '';
	        }

	        var output = '';
	        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
	        var i = 0;

	        // input = encodeURI(input);
	        input = Utf8.encode(input);

	        while (i < input.length) {
	            chr1 = input.charCodeAt(i++);
	            chr2 = input.charCodeAt(i++);
	            chr3 = input.charCodeAt(i++);

	            // 第一个字符前6位
	            enc1 = chr1 >> 2;
	            // 第一个字符后两位加第二个字符前4位
	            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
	            // 第二个字符后四位加第三个字符前两位
	            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
	            // 第三个字符后六位
	            enc4 = chr3 & 63;

	            if (isNaN(chr2)) {
	                enc3 = enc4 = 64;
	            } else if (isNaN(chr3)) {
	                enc4 = 64;
	            }

	            output = output + code.charAt(enc1) + code.charAt(enc2) +
	                code.charAt(enc3) + code.charAt(enc4);
	        }
	        return output;
	    };

	    var decode = nativeAtob || function(input) {
	        if (!input) {
	            return '';
	        }

	        var output = '';
	        var chr1, chr2, chr3;
	        var enc1, enc2, enc3, enc4;
	        var i = 0;

	        // 保证格式正确
	        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');

	        while (i < input.length) {

	            enc1 = code.indexOf(input.charAt(i++));
	            enc2 = code.indexOf(input.charAt(i++));
	            enc3 = code.indexOf(input.charAt(i++));
	            enc4 = code.indexOf(input.charAt(i++));

	            chr1 = (enc1 << 2) | (enc2 >> 4);
	            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
	            chr3 = ((enc3 & 3) << 6) | enc4;

	            output = output + String.fromCharCode(chr1);
	            if (enc3 != 64) {
	                output = output + String.fromCharCode(chr2);
	            }
	            if (enc4 != 64) {
	                output = output + String.fromCharCode(chr3);
	            }
	        }

	        // output = decodeURI(output);
	        output = Utf8.decode(output);
	        return output;
	    };

	    module.exports = {
	        btoa: encode,
	        atob: decode,
	        encode: encode,
	        decode: decode
	    };

	})(this);

/***/ }
/******/ ])
});
;