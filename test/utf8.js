const assert = require('assert')
const expect = require('expect.js')

const Utf8 = require('../src/utf8')

describe('utf8', function () {

  it('should encode and decode 1 byte string', function () {
    let str = "abcd"
    assert.equal(str, Utf8.decode(Utf8.encode(str)))
    assert.equal(str, Utf8.encode(str))
  })

  it('should encode and decode 2 bytes string', function () {
    let str = "̢̡"
    assert.equal(str, Utf8.decode(Utf8.encode(str)))
  })

  it('should encode and decode 3 bytes string', function () {
    let str = "这是个中文字符串"
    assert(str, Utf8.decode(Utf8.encode(str)))
  })
})
