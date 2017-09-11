/**
 * 一种简单的对称加密函数
 * left + right = 8
 * left > 0
 * right > 0
 *
 * 明文以2字节作为一段使用一个对称加密函数进行加密，加密完8个字节后，继续循环使用4个随机生成的对称加密函数进行加密；
 */

var Utf8 = require('./utf8');

var encryptTemplate = function (left, right) {

  return function (v) {

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

var decryptTemplate = function (left, right) {
  return function (v) {
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

var encrypt = function (str) {
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
    ret += method(str.charAt(i));
  }

  return ret;
};

var decrypt = function (str) {
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
    ret += method(str.charAt(i));
  }

  // return decodeURI(ret)
  return Utf8.decode(ret);
};

module.exports = {
  encrypt: encrypt,
  decrypt: decrypt
}