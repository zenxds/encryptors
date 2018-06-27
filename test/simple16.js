const assert = require('assert')
const expect = require('expect.js')

const simple16 = require('../src/simple16')

describe('simple16', function () {

  it('should encode and decode 1 byte string', function () {
    let str = "abcd"
    assert.equal(str, simple16.decrypt(simple16.encrypt(str)))

    str = "abcdefghijklmnopqrstuvwxyz"
    assert.equal(str, simple16.decrypt(simple16.encrypt(str)))
  })

  it('should encode and decode 2 bytes string', function () {
    let str = "̢̡"
    assert.equal(str, simple16.decrypt(simple16.encrypt(str)))
  })

  it('should encode and decode 3 bytes string', function () {
    let str = "这是个中文字符串"
    assert.equal(str, simple16.decrypt(simple16.encrypt(str)))
  })
})
