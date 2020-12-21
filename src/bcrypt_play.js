const bcrypt = require('bcrypt');
const base64 = require('base-64');

const saltRounds = 10;
var password = "P@55w0rd";

// npm run bcrypt
module.exports.init = function () {
    bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) console.error(err);
        
        // returns salt
        console.log('SALT: ', salt);
        bcrypt.hash(password, salt, function (err, hash) {
            if (err) console.error(err);
            
            // returns hash
            console.log('HASH: ', hash);
            var encodeHash = base64.encode(hash);
            console.log('ENCODE-BASE64: ', encodeHash);
            console.log('DECODE-BASE64: ', base64.decode(encodeHash));

            bcrypt.compare("P@55w0rd", hash, function (err, result) {
                if (err) console.error(err);
                // returns result
                console.log('COMPARE: ', result);
            });
        });
    });
};