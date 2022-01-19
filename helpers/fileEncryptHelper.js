const crypto = require('crypto');
class FileEncryptHelper {
    getCipherKey(password) {
        return crypto.createHash('sha256').update(password).digest();
    }
}

module.exports = new FileEncryptHelper();