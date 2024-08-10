const crypto = require("crypto");
var keyold = require("../config.json").asekey;
var CryptoJS = require("crypto-js");
var key = CryptoJS.enc.Utf8.parse(keyold.apikey);
var webkey = CryptoJS.enc.Utf8.parse(keyold.webkey);
/* 加密 */
exports.encrypt = (text) => {
  const ivold = crypto.randomBytes(8).toString("hex");
  var iv = CryptoJS.enc.Utf8.parse(ivold); //

  var cipherText = CryptoJS.AES.encrypt(text, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }),
    encrypted = cipherText.toString();
  return {
    word: encrypted,
    data: ivold,
    encryptiontype: "base64",
    key:
      crypto.randomBytes(8).toString("hex") +
      crypto.randomBytes(8).toString("hex"),
  };
};

// 解密函数
exports.decrypt = (word, data) => {
  // 将 key 和 iv 转换为 Buffer 数组
  let ivWordArray = CryptoJS.enc.Utf8.parse(word);
  try {
    var decipherText = CryptoJS.AES.decrypt(data, webkey, {
        iv: ivWordArray,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }),
      decrypted = decipherText.toString(CryptoJS.enc.Utf8);
    //   console.log('res',decrypted);
    return JSON.parse(decrypted);
  } catch (err) {
    // console.log(err);
    console.log("error Mysql 8.0 tim_list");
  }
  // 创建解密器
};
