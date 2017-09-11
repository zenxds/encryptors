var assert = require('assert');
var expect = require('expect.js');

var zero = require('../src/zero');

describe('zero', function () {

  it('should encrypt and decrypt 1 byte string', function () {
    var str = "abcd";
    assert.equal(str, zero.decrypt(zero.encrypt(str)));
  });

  it('should encrypt and decrypt 2 bytes string', function () {
    var str = "̢̡";
    assert.equal(str, zero.decrypt(zero.encrypt(str)));
  });

  it('should encrypt and decrypt 3 bytes string', function () {
    var str = "这是个中文字符串";
    assert(str, zero.decrypt(zero.encrypt(str)));
  });
});