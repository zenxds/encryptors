// 匹配规则：
// 理论上可以更大，没有继续测
// 0 < $integer < 100000


const $integer = 9527

const encrypt = function (v) {
  if (!v) {
    return ''
  }

  let ret = ''
  let k = $integer

  for (let i = 0; i < v.length; i++) {
    let c = v.charCodeAt(i)
    let a = c ^ k
    k = a
    ret += String.fromCharCode(a)
  }

  return ret
}

const decrypt = function (v) {
  if (!v) {
    return ''
  }

  let ret = ""
  let k = $integer
  for (let i = 0; i < v.length; i++) {
    let c = v.charCodeAt(i)
    let a = (c ^ k)
    k = c
    ret += String.fromCharCode(a)
  }
  return ret
}

module.exports = {
  encrypt: encrypt,
  decrypt: decrypt
}
