// 0 < $integer < 100000
// 理论上可以更大，没有继续测
const $integer1 = 9527
const $integer2 = 2333

const encrypt = function (v) {
  if (!v) {
    return ''
  }

  let ret = ""
  let k = $integer1
  for (let i = 0; i < v.length; i++) {
    let c = v.charCodeAt(i)
    let a = c ^ k
    k = ((k * i) % 256) + $integer2
    ret += String.fromCharCode(a)
  }
  return ret
}

const decrypt = function (v) {
  if (!v) {
    return ''
  }

  let ret = ""
  let k = $integer1
  for (let i = 0; i < v.length; i++) {
    let c = v.charCodeAt(i)
    let a = c ^ k
    k = ((k * i) % 256) + $integer2
    ret += String.fromCharCode(a)
  }
  return ret
}

module.exports = {
  encrypt: encrypt,
  decrypt: decrypt
}
