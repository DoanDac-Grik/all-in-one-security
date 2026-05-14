const crypto = require('crypto');
const fs = require('fs');
require('dotenv').config();

const algorithm = 'aes-256-ctr';
let key = process.env.HASH_FILE_KEY;
key = crypto.createHash('sha256').update(key).digest('base64').substr(0, 32);

function encrypt(buffer) {
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createDecipheriv(algorithm, key, iv);

    const result = Buffer.concat([iv, cipher.update(buffer), cipher.final()]);

    return result
}

function encryptFile() {

    fs.readFile('./public/file/test.txt', (err, file) => {
        if (err) {
            return console.error(err.message);
        }

        const encryptFile = encrypt(file);

        fs.writeFile('./public/file/cryptFile.txt', encryptFile, (err, file) => {
            if (err) {
                return console.error(err.message);
            }

            if (file) {
                console.log('Encrypt file success!!!');
            }
        })
    })
}


encryptFile();