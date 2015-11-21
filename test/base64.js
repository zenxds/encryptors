var assert = require('assert');
var expect = require('expect.js');

var base64 = require('../src/base64');

describe('base64', function() {

    it('should encode and decode 1 byte string', function() {
        var str = "abcd";
        assert.equal(str, base64.decode(base64.encode(str, true), true));
    });

    it('should encode and decode 2 bytes string', function() {
        var str = "̢̡";
        assert.equal(str, base64.decode(base64.encode(str, true), true));
    });

    it('should encode and decode 3 bytes string', function() {
        var str = "这是个中文字符串";
        assert(str, base64.decode(base64.encode(str, true), true));
    });
});
