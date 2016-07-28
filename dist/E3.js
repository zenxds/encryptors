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
/***/ function(module, exports) {

	// 匹配规则：
	// 理论上可以更大，没有继续测
	// 0 < $integer < 100000


	var $integer = 9527;

	var encrypt = function(v) {
	    if (!v) {
	        return '';
	    }

	    var ret = '';
	    var k = $integer;
	    for (var i = 0; i < v.length; i++) {
	        var c = v.charCodeAt(i);
	        var a = c ^ k;
	        k = a;
	        ret += String.fromCharCode(a);
	    }

	    return ret;
	};

	var decrypt = function(v) {
	    if (!v) {
	        return '';
	    }

	    var ret = "";
	    var k = $integer;
	    for (var i = 0; i < v.length; i++) {
	        var c = v.charCodeAt(i);
	        var a = (c ^ k);
	        k = c;
	        ret += String.fromCharCode(a);
	    }
	    return ret;
	};

	module.exports = {
	    encrypt: encrypt,
	    decrypt: decrypt
	};

/***/ }
/******/ ])
});
;