(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
<<<<<<< HEAD
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
=======
	else if(typeof exports === 'object')
		exports["dx"] = factory();
	else
		root["dx"] = factory();
})(this, function() {
>>>>>>> sdk
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
<<<<<<< HEAD
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
=======
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
>>>>>>> sdk
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
  } // U+0080 - U+07FF => 2 bytes 110yyyyy, 10zzzzzz
  // U+0800 - U+FFFF => 3 bytes 1110xxxx, 10yyyyyy, 10zzzzzz
  // 拆分后的单字节以1开头，utf8中没有在用


  return String(str).replace(/[\u0080-\u07ff]/g, function (c) {
    var cc = c.charCodeAt(0);
    return String.fromCharCode(0xc0 | cc >> 6, 0x80 | cc & 0x3f);
  }).replace(/[\u0800-\uffff]/g, function (c) {
    var cc = c.charCodeAt(0);
    return String.fromCharCode(0xe0 | cc >> 12, 0x80 | cc >> 6 & 0x3f, 0x80 | cc & 0x3f);
  });
}

function decode(str) {
  if (!str) {
    return '';
  } // 跟上面转换过的范围一一对应
  // note: decode 3-byte chars first as decoded 2-byte strings could appear to be 3-byte char!


  return str.replace(/[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g, // 3-byte chars
  function (c) {
    // (note parentheses for precence)
    var cc = (c.charCodeAt(0) & 0x0f) << 12 | (c.charCodeAt(1) & 0x3f) << 6 | c.charCodeAt(2) & 0x3f;
    return String.fromCharCode(cc);
  }).replace(/[\u00c0-\u00df][\u0080-\u00bf]/g, // 2-byte chars
  function (c) {
    // (note parentheses for precence)
    var cc = (c.charCodeAt(0) & 0x1f) << 6 | c.charCodeAt(1) & 0x3f;
    return String.fromCharCode(cc);
  });
}

module.exports = {
  encode: encode,
  decode: decode
};

<<<<<<< HEAD
=======

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


>>>>>>> sdk
/***/ })
/******/ ]);
});