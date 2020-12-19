const { v4: uuidv4 } = require('uuid');

// npm run uuid
module.exports.init = function () {
    console.log(uuidv4());
}