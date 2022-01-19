const UploadHelper = require('../helpers/upload');
const AppendInitVect = require('../helpers/appendInitVector');
const {
    getCipherKey
} = require('../helpers/fileEncryptHelper');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const {
    unlink,
    stat,
    statSync,
} = require('fs');
const generatePassword = require('password-generator');
require('dotenv').config();

class EncryptFileController {
    showEncryptFile(req, res, next) {
        res.render('Pentest/encrypt-file', {
            'title': 'Ecryption file',
            'css': 'file',
            message: req.flash('message', null),
        });
    }

    resultFile(req, res, next) {
        const key = req.query?.key || null;
        const filename = req.query?.filename || null;
        const pathFolder = 'public/file/result';
        const action = key ? 'Encrypt' : 'Decrypt'; 

        if (filename) {
            
            stat(pathFolder + '/' + filename, (err, stats) => {
                if (err) {
                    console.log(`File doesn't exist.`);
                } else {
                    res.render('ResultPentest/encrypt-decrypt', {
                        'title': 'File result',
                        'css': 'result-file-en-de',
                        key,
                        action,
                        filename,
                        filesize: stats.size
                    })
                }
            })
            
        } else {
            //Capture All 404 errors
            res.status(404).render('exception/404.ejs', {
                layout: false
            });
        }
    }

    downloadFile(req, res, next) {
        const filename = req.query?.filename || null;
        const pathFolder = 'public/file/result';
        if (filename) {
            // Download file
            res.download(`${pathFolder}/${filename}`, (err) => {
                if (err) {
                    res.status(500).send({
                        message: "File can not be downloaded: " + err,
                    });
                }
                // Delete file
                unlink(`${pathFolder}/${filename}`, (err) => {
                    if (err) throw err;
                    console.log('File was deleted');
                });
            })
        }
    }

    fileEncrypt(req, res, next) {
        const pathFolder = 'public/file/result';
        const param = 'file';
        const upload = UploadHelper.upload(pathFolder, param)

        // Upload file
        upload(req, res, (err) => {
            const validFile = UploadHelper.checkValidFile(res, req, err);
            console.log(req.file);
            try {
                const password = generatePassword(5, true);
                // Generate a secure, pseudo random initialization vector.
                const initVect = crypto.randomBytes(16);

                // Generate a cipher key from the password.
                const CIPHER_KEY = getCipherKey(password);
                const readStream = fs.createReadStream(pathFolder + '/' + req.file.filename);
                const gzip = zlib.createGzip();
                const cipher = crypto.createCipheriv('aes256', CIPHER_KEY, initVect);
                const appendInitVect = new AppendInitVect(initVect);

                // Create a write stream with a different file extension.
                const writeStream = fs.createWriteStream(path.join(pathFolder + '/' + req.file.filename + ".enc"));

                readStream
                    .pipe(gzip)
                    .pipe(cipher)
                    .pipe(appendInitVect)
                    .pipe(writeStream);
                
                // Delete file
                unlink(`${req.file.destination}/${req.file.filename}`, (err) => {
                    if (err) throw err;
                    res.redirect(`/encrypt-file/result?key=${password}&filename=${req.file.filename}.enc`);
                });

            } catch (error) {
                console.log(error);
            }
        })
    }

    fileDescrypt(req, res, next) {
        const pathFolder = 'public/file/result';
        const param = 'file';
        const upload = UploadHelper.upload(pathFolder, param)

        // Upload file
        upload(req, res, (err) => {
            const validFile = UploadHelper.checkValidFile(res, req, err);
            console.log(req.file);
            const password = req.body.secretDescrypt;

            // First, get the initialization vector from the file.
            const readInitVect = fs.createReadStream(pathFolder + '/' + req.file.filename, {
                end: 15
            });

            let initVect;
            readInitVect.on('data', (chunk) => {
                initVect = chunk;
            });

            // Once we’ve got the initialization vector, we can decrypt the file.
            readInitVect.on('close', () => {
                const cipherKey = getCipherKey(password);
                const readStream = fs.createReadStream(pathFolder + '/' + req.file.filename, {
                    start: 16
                });
                const decipher = crypto.createDecipheriv('aes256', cipherKey, initVect);
                const unzip = zlib.createUnzip();
                const writeStream = fs.createWriteStream(path.join(pathFolder + '/' + req.file.filename + '.unenc'));

                readStream
                    .pipe(decipher)
                    .pipe(unzip)
                    .pipe(writeStream);

                // Delete file
                unlink(`${req.file.destination}/${req.file.filename}`, (err) => {
                    if (err) throw err;
                    res.redirect(`/encrypt-file/result?filename=${req.file.filename}.unenc`);
                });
            });
        })
    }

}

module.exports = new EncryptFileController();