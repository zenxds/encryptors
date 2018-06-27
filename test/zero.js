const assert = require('assert')
const expect = require('expect.js')

const zero = require('../src/zero')

describe('zero', function () {
  it('should encrypt and decrypt 1 byte string', function () {
    let str = "abcd"
    assert.equal(str, zero.decrypt(zero.encrypt(str)))
  })

  it('should encrypt and decrypt 2 bytes string', function () {
    let str = "̢̡"
    assert.equal(str, zero.decrypt(zero.encrypt(str)))
  })

  it('should encrypt and decrypt 3 bytes string', function () {
    let str = "这是个中文字符串"
    assert(str, zero.decrypt(zero.encrypt(str)))
  })
})
