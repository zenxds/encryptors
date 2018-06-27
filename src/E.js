/**
 * 一种简单的对称加密函数
 * left + right = 8
 * left > 0
 * right > 0
 *
 * 明文以2字节作为一段使用一个对称加密函数进行加密，加密完8个字节后，继续循环使用4个随机生成的对称加密函数进行加密；
 */

const Utf8 = require('./utf8')

const encryptTemplate = function (left, right) {

  return function (v) {
    let ret = ''

    for (let i = 0; i < v.length; i++) {
      let c = v.charCodeAt(i)
      let a = c >> right
      let b = c << left
      let d = (a + b) & 0xff
      ret += String.fromCharCode(d)
    }

    return ret
  }
}

const decryptTemplate = function (left, right) {
  return function (v) {
    let ret = ''
    for (let i = 0; i < v.length; i++) {
      let c = v.charCodeAt(i)
      let a = c >> left
      let b = c << right
      let d = (a + b) & 0xff
      ret += String.fromCharCode(d)
    }

    return ret
  }
}

// 还用5-3,6-2,7-1未使用
const EA = encryptTemplate(1, 7)
const EB = encryptTemplate(2, 6)
const EC = encryptTemplate(3, 5)
const ED = encryptTemplate(4, 4)

const DA = decryptTemplate(1, 7)
const DB = decryptTemplate(2, 6)
const DC = decryptTemplate(3, 5)
const DD = decryptTemplate(4, 4)

const encrypt = function (str) {
  if (!str) {
    return ''
  }

  // str = encodeURI(str)
  str = Utf8.encode(str)

  let ret = ''
  let method
  let order


  // 自己组合可以产生N种算法
  for (let i = 0; i < str.length; i++) {
    order = i % 8

    if (order < 2) {
      method = EA
    } else if (order < 4) {
      method = EB
    } else if (order < 6) {
      method = EC
    } else {
      method = ED
    }
    ret += method(str.charAt(i))
  }

  return ret
}

const decrypt = function (str) {
  if (!str) {
    return ''
  }

  let ret = ''
  let method
  let order

  for (let i = 0; i < str.length; i++) {
    order = i % 8

    if (order < 2) {
      method = DA
    } else if (order < 4) {
      method = DB
    } else if (order < 6) {
      method = DC
    } else {
      method = DD
    }
    ret += method(str.charAt(i))
  }

  // return decodeURI(ret)
  return Utf8.decode(ret)
}

module.exports = {
  encrypt: encrypt,
  decrypt: decrypt
}
