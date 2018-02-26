const crypto = require('crypto')
const assert = require('assert')
const expect = require('expect.js')

const md51 = require('blueimp-md5')
const md52 = (str) => {
  const sha1 = crypto.createHash('md5')
  sha1.update(str)
  return sha1.digest('hex')
}

function randomStr(length) {
  let str = ''

  while (str.length < length) {
    str += Math.random().toString(36).slice(2)
  }
  return str.substr(0, length)
}

/**
 * 随机min-max之间的一个整数
 * 包含min和max
 */
function random(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1))
}

describe('simple16', function() {

  it('should md5 the string', function() {

    for (let i = 0; i < 10000; i++) {
      let str = randomStr(random(20, 100))
      assert.equal(md51(str), md52(str))
    }
  })
})