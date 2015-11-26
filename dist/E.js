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
	 * 一种简单的对称加密函数
	 * left + right = 8
	 * left > 0
	 * right > 0
	 *
	 * 明文以2字节作为一段使用一个对称加密函数进行加密，加密完8个字节后，继续循环使用4个随机生成的对称加密函数进行加密；
	 */

	var Utf8 = __webpack_require__(1);

	var encryptTemplate = function(left, right) {

	    return function(v) {

	        var ret = '';
	        for (var i = 0; i < v.length; i++) {
	            var c = v.charCodeAt(i);
	            var a = c >> right;
	            var b = c << left;
	            var d = (a + b) & 0xff;
	            ret += String.fromCharCode(d);
	        }

	        return ret;
	    }
	};

	var decryptTemplate = function(left, right) {
	    return function(v) {
	        var ret = '';
	        for (var i = 0; i < v.length; i++) {
	            var c = v.charCodeAt(i);
	            var a = c >> left;
	            var b = c << right;
	            var d = (a + b) & 0xff;
	            ret += String.fromCharCode(d);
	        }

	        return ret;
	    }
	};

	// 还用5-3,6-2,7-1未使用
	var EA = encryptTemplate(1, 7);
	var EB = encryptTemplate(2, 6);
	var EC = encryptTemplate(3, 5);
	var ED = encryptTemplate(4, 4);

	var DA = decryptTemplate(1, 7);
	var DB = decryptTemplate(2, 6);
	var DC = decryptTemplate(3, 5);
	var DD = decryptTemplate(4, 4);

	var encrypt = function(str) {
	    if (!str) {
	        return '';
	    }

	    // str = encodeURI(str)
	    str = Utf8.encode(str);

	    var ret = '',
	        method, order;


	    // 自己组合可以产生N种算法
	    for (var i = 0; i < str.length; i++) {
	        order = i % 8;

	        if (order < 2) {
	            method = EA;
	        } else if (order < 4) {
	            method = EB;
	        } else if (order < 6) {
	            method = EC;
	        } else {
	            method = ED;
	        }
	        ret += method(str[i]);
	    }

	    return ret;
	};

	var decrypt = function(str) {
	    if (!str) {
	        return '';
	    }

	    var ret = '',
	        method, order;

	    for (var i = 0; i < str.length; i++) {
	        order = i % 8;

	        if (order < 2) {
	            method = DA;
	        } else if (order < 4) {
	            method = DB;
	        } else if (order < 6) {
	            method = DC;
	        } else {
	            method = DD;
	        }
	        ret += method(str[i]);
	    }

	    // return decodeURI(ret)
	    return Utf8.decode(ret);
	};

	module.exports = {
	    encrypt: encrypt,
	    decrypt: decrypt
	}


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


/***/ }
/******/ ])
});
;