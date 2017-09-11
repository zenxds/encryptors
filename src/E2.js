// 对同一数字 ^ 还得到本身

// key为任意字符串(a-zA-Z0-9)
// $integer理论上任意数字
var $key = 'V587';
var $integer = 10000;

var encrypt = function (v) {
  if (!v) {
    return '';
  }

  var ret = '';
  var key = $key;
  var k = $integer;
  for (var i = 0; i < v.length; i++) {
    var c = v.charCodeAt(i);
    k = (k + 1) % key.length;
    c = c ^ key.charCodeAt(k);

    ret += String.fromCharCode(c);
  }

  return ret;
};

// 加解密函数相同
module.exports = {
  encrypt: encrypt,
  decrypt: encrypt
};