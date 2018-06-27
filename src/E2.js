// 对同一数字 ^ 还得到本身

// key为任意字符串(a-zA-Z0-9)
// $integer理论上任意数字
const $key = 'V587';
const $integer = 10000;

const encrypt = function (v) {
  if (!v) {
    return ''
  }

  let ret = ''
  let key = $key;
  let k = $integer

  for (let i = 0; i < v.length; i++) {
    let c = v.charCodeAt(i)
    k = (k + 1) % key.length
    c = c ^ key.charCodeAt(k)

    ret += String.fromCharCode(c)
  }

  return ret
}

// 加解密函数相同
module.exports = {
  encrypt: encrypt,
  decrypt: encrypt
}
