(function(global) {
    // 如果不想依赖Utf8则可以使用原生的encodeURI
    var Utf8 = require('./utf8');

    var nativeAtob = global.atob;
    var nativeBtoa = global.btoa;
    // code顺序可以自定义
    var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

    // http://www.webtoolkit.info/javascript-base64.html
    var encode = nativeBtoa || function(input) {
        if (!input) {
            return '';
        }

        var output = '';
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        // input = encodeURI(input);
        input = Utf8.encode(input);

        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            // 第一个字符前6位
            enc1 = chr1 >> 2;
            // 第一个字符后两位加第二个字符前4位
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            // 第二个字符后四位加第三个字符前两位
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            // 第三个字符后六位
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output + code.charAt(enc1) + code.charAt(enc2) +
                code.charAt(enc3) + code.charAt(enc4);
        }
        return output;
    };

    var decode = nativeAtob || function(input) {
        if (!input) {
            return '';
        }

        var output = '';
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        // 保证格式正确
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');

        while (i < input.length) {

            enc1 = code.indexOf(input.charAt(i++));
            enc2 = code.indexOf(input.charAt(i++));
            enc3 = code.indexOf(input.charAt(i++));
            enc4 = code.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }

        // output = decodeURI(output);
        output = Utf8.decode(output);
        return output;
    };

    module.exports = {
        btoa: encode,
        atob: decode,
        encode: encode,
        decode: decode
    };

})(this);