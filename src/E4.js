// 0 < $integer < 100000
// 理论上可以更大，没有继续测
var $integer1 = 9527;
var $integer2 = 2333;

var encrypt = function (v) {
  if (!v) {
    return '';
  }

  var ret = "";
  var k = $integer1;
  for (var i = 0; i < v.length; i++) {
    var c = v.charCodeAt(i);
    var a = c ^ k;
    k = ((k * i) % 256) + $integer2;
    ret += String.fromCharCode(a);
  }
  return ret;
};

var decrypt = function (v) {
  if (!v) {
    return '';
  }

  var ret = "";
  var k = $integer1;
  for (var i = 0; i < v.length; i++) {
    var c = v.charCodeAt(i);
    var a = c ^ k;
    k = ((k * i) % 256) + $integer2;
    ret += String.fromCharCode(a);
  }
  return ret;
};

module.exports = {
  encrypt: encrypt,
  decrypt: decrypt
};