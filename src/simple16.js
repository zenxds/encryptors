/**
 * 对charCode toString
 * 16可以替换成2-36任意
 * 会增加加密后的长度，不推荐
 */
module.exports = {
    encrypt: function(str) {
        if (!str) {
            return '';
        }
        var ret = [];
        for (var i = 0; i < str.length; i++) {
            ret.push(str.charCodeAt(i).toString(16));
        }
        return ret.join(',');
    },

    decrypt: function (str) {
        if (!str) {
            return '';
        }
        var ret = [];
        str = str.split(',');
        for (var i = 0; i < str.length; i++) {
            ret.push(String.fromCharCode(parseInt(str[i], 16)));
        }
        return ret.join('');
    }
};