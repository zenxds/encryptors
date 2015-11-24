module.exports = {
    encrypt: function(str) {
        var ret = [];
        for (var i = 0; i < str.length; i++) {
            ret.push(str.charCodeAt(i).toString(16));
        }
        return ret.join(',');
    },

    decrypt: function (str) {
        var ret = [];
        str = str.split(',');
        for (var i = 0; i < str.length; i++) {
            ret.push(String.fromCharCode(parseInt(str[i], 16)));
        }
        return ret.join('');
    }
};