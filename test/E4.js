var assert = require('assert');
var expect = require('expect.js');

var E = require('../src/E4');

describe('E4', function() {

    it('should encode and decode 1 byte string', function() {
        var str = "abcd";
        assert.equal(str, E.decrypt(E.encrypt(str)));

        str = "abcdefghijklmnopqrstuvwxyz";
        assert.equal(str, E.decrypt(E.encrypt(str)));
    });

    it('should encode and decode 2 bytes string', function() {
        var str = "̢̡";
        assert.equal(str, E.decrypt(E.encrypt(str)));
    });

    it('should encode and decode 3 bytes string', function() {
        var str = "这是个中文字符串";
        assert.equal(str, E.decrypt(E.encrypt(str)));
    });
});
