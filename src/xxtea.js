/**
 * https://en.wikipedia.org/wiki/XXTEA
 * XXTEA是一种分组密码算法，其明文块为32比特，密钥长度为128比特
 * 以一个字符占8位计算
 * 在js中就是明文分成4个字符一组
 * 密钥应该是长度为16的字符
 */
const Utf8 = require('./utf8')
const base64 = require('./base64')

function strToLongs(s, includeLength) {
  let l = new Array(Math.ceil(s.length / 4))

  for (let i = 0; i < l.length; i++) {
    // note little-endian encoding - endianness is irrelevant as long as
    // it is the same in longsToStr()
    l[i] = s.charCodeAt(i * 4) + (s.charCodeAt(i * 4 + 1) << 8) +
      (s.charCodeAt(i * 4 + 2) << 16) + (s.charCodeAt(i * 4 + 3) << 24)
  }

  if (includeLength) {
    l.push(s.length)
  }
  return l
}

function longsToStr(l, includeLength) { // convert array of longs back to string
  let a = new Array(l.length)

  for (var i = 0; i < l.length; i++) {
    a[i] = String.fromCharCode(l[i] & 0xFF, l[i] >>> 8 & 0xFF,
      l[i] >>> 16 & 0xFF, l[i] >>> 24 & 0xFF)
  }

  return includeLength ? a.join('').substring(0, (l.length - 1) << 2) : a.join('')
}

function encrypt(plaintext, password) {
  if (!plaintext) {
    return ''
  }

  let v = strToLongs(Utf8.encode(plaintext), true)

  // 算法不支持长度小于2，手动添加一个值
  if (v.length <= 1) {
    v[1] = 0
  }

  // simply convert first 16 chars of password as key
  let k = strToLongs(Utf8.encode(password).slice(0, 16))
  let n = v.length

  // ---- <TEA coding> ----

  let z = v[n - 1]
  let y = v[0]
  let delta = 0x9E3779B9
  let mx
  let e
  let q = Math.floor(6 + 52 / n)
  let sum = 0

  while (q-- > 0) { // 6 + 52/n operations gives between 6 & 32 mixes on each word
    sum += delta
    e = sum >>> 2 & 3
    for (let p = 0; p < n; p++) {
      y = v[(p + 1) % n]
      mx = (z >>> 5 ^ y << 2) + (y >>> 3 ^ z << 4) ^ (sum ^ y) + (k[p & 3 ^ e] ^ z)
      z = v[p] += mx
    }
  }

  // ---- </TEA> ----

  let ciphertext = longsToStr(v)

  // 使用unicode编码，base64等，只要在解码函数里能解出来就行
  return base64.encode(ciphertext)
}

function decrypt(ciphertext, password) {
  if (!ciphertext) {
    return ''
  }

  let v = strToLongs(base64.decode(ciphertext))
  let k = strToLongs(Utf8.encode(password).slice(0, 16))
  let n = v.length

  // ---- <TEA decoding> ----

  let z = v[n - 1]
  let y = v[0]
  let delta = 0x9E3779B9;
  let mx
  let e
  let q = Math.floor(6 + 52 / n)
  let sum = q * delta

  while (sum != 0) {
    e = sum >>> 2 & 3
    for (let p = n - 1; p >= 0; p--) {
      z = v[p > 0 ? p - 1 : n - 1]
      mx = (z >>> 5 ^ y << 2) + (y >>> 3 ^ z << 4) ^ (sum ^ y) + (k[p & 3 ^ e] ^ z)
      y = v[p] -= mx
    }
    sum -= delta
  }

  // ---- </TEA> ----
  let plaintext = longsToStr(v, true).replace(/\u0000/g, '')
  return Utf8.decode(plaintext)
}

module.exports = {
  encrypt: encrypt,
  decrypt: decrypt
}
