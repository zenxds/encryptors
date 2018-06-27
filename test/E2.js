const assert = require('assert')
const expect = require('expect.js')

const E = require('../src/E2')

describe('E2', function () {

  it('should encode and decode 1 byte string', function () {
    let str = "abcd"
    assert.equal(str, E.decrypt(E.encrypt(str)))

    str = "abcdefghijklmnopqrstuvwxyz"
    assert.equal(str, E.decrypt(E.encrypt(str)))
  })

  it('should encode and decode 2 bytes string', function () {
    let str = "̢̡"
    assert.equal(str, E.decrypt(E.encrypt(str)))
  })

  it('should encode and decode 3 bytes string', function () {
    let str = "这是个中文字符串"
    assert.equal(str, E.decrypt(E.encrypt(str)))
  })
})
