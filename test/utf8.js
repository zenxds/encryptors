var assert = require('assert');
var expect = require('expect.js');

var Utf8 = require('../src/utf8');

describe('utf8', function() {

    it('should encode and decode 1 byte string', function() {
        var str = "abcd";
        assert.equal(str, Utf8.decode(Utf8.encode(str)));
    });

    it('should encode and decode ascii 2 bytes string', function() {
        var str = "̢̡";
        assert.equal(str, Utf8.decode(Utf8.encode(str)));
    });

    it('should encode and decode 3 bytes string', function() {
        var str = "这是个中文字符串";
        assert(str, Utf8.decode(Utf8.encode(str)));
    });

    it('should encode and decode 3 bytes string', function() {
        var str = "\u00e0\u0080\u0080";
        assert(str, Utf8.decode(Utf8.encode(str)));
    });
});
