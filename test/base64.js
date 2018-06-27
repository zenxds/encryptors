const assert = require('assert')
const expect = require('expect.js')

const base64 = require('../src/base64')

describe('base64', function () {

  it('should encode to the right pattern', function () {
    let str = "abcd"
    expect(base64.encode(str)).to.match(/[A-Za-z\+\=\/]+/)
  })

  it('should encode to the right length', function () {
    assert.equal(base64.encode("a").length, 4)
    assert.equal(base64.encode("ab").length, 4)
    assert.equal(base64.encode("abc").length, 4)
    assert.equal(base64.encode("abcd").length, 8)
    assert.equal(base64.encode("a").length, 4)
  })

  it('should encode and decode 1 byte string', function () {
    let str = "abcd"
    assert.equal(str, base64.decode(base64.encode(str)))
  })

  it('should encode and decode 2 bytes string', function () {
    let str = "̢̡"
    assert.equal(str, base64.decode(base64.encode(str)))
  })

  it('should encode and decode 3 bytes string', function () {
    let str = "这是个中文字符串"
    assert(str, base64.decode(base64.encode(str)))
  })
})
