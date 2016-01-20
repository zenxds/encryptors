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
        var a = (c ^ k);
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