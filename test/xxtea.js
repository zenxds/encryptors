var assert = require('assert');
var expect = require('expect.js');

var xxtea = require('../src/xxtea');

describe('xxtea', function() {

    it('should encrypt the common string', function() {
        var text = "this is a text to encrypt";
        var password = "abcdefghijklmnop";

        assert.equal(text, xxtea.decrypt(xxtea.encrypt(text, password), password));

        text = "this is another text to encrypt";
        assert.equal(text, xxtea.decrypt(xxtea.encrypt(text, password), password));

        text = "t";
        assert.equal(text, xxtea.decrypt(xxtea.encrypt(text, password), password));

        password = "qwertyuiop";
        assert.equal(text, xxtea.decrypt(xxtea.encrypt(text, password), password));
    });

    it('should encrypt the chinese', function() {
        var text = "这是一个中文字符";
        var password = "abcdefghijklmnop";

        text = "这是一个中文字符串";
        assert.equal(text, xxtea.decrypt(xxtea.encrypt(text, password), password));

        text = "这是另一个中文字符串";
        assert.equal(text, xxtea.decrypt(xxtea.encrypt(text, password), password));

        password = "qwertyuiop";
        assert.equal(text, xxtea.decrypt(xxtea.encrypt(text, password), password));
    });
});
