var assert = require('assert');
var expect = require('expect.js');

var simple16 = require('../src/simple16');

describe('simple16', function() {

    it('should encode and decode 1 byte string', function() {
        var str = "abcd";
        assert.equal(str, simple16.decrypt(simple16.encrypt(str)));

        str = "abcdefghijklmnopqrstuvwxyz";
        assert.equal(str, simple16.decrypt(simple16.encrypt(str)));
    });

    it('should encode and decode 2 bytes string', function() {
        var str = "̢̡";
        assert.equal(str, simple16.decrypt(simple16.encrypt(str)));
    });

    it('should encode and decode 3 bytes string', function() {
        var str = "这是个中文字符串";
        assert.equal(str, simple16.decrypt(simple16.encrypt(str)));
    });
});
