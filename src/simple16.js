/**
 * 对charCode toString
 * 16可以替换成2-36任意
 * 会增加加密后的长度，不推荐
 */
module.exports = {
  encrypt: function (str) {
    if (!str) {
      return ''
    }

    const ret = []
    for (let i = 0; i < str.length; i++) {
      ret.push(str.charCodeAt(i).toString(16))
    }
    return ret.join(',')
  },

  decrypt: function (str) {
    if (!str) {
      return ''
    }

    str = str.split(',')

    const ret = []
    for (let i = 0; i < str.length; i++) {
      ret.push(String.fromCharCode(parseInt(str[i], 16)))
    }
    return ret.join('')
  }
}
