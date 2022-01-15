const UploadHelper = require('../helpers/upload');
const multer = require('multer');
const crypto = require('crypto');
const { unlink } = require('fs');
const flash = require('connect-flash');
require('dotenv').config();

class EncryptFileController {
    showEncryptFile(req, res, next) {
        res.render('Pentest/encrypt-file', {
            'title': 'Ecryption file',
            'css': 'file',
            message: req.flash('message', null)
        });
    }

    fileEncrypt(req, res, next) {
        const path = 'public/file/';
        const param = 'file';
        const upload = UploadHelper.upload(path, param)

        // Upload file
        upload(req, res, (err) => {
            const validFile = UploadHelper.checkValidFile(res, req, err);
            console.log(req.file);
            
            // Download file
            // res.download(`${req.file.destination}/${req.file.filename}`, (err) => {
            //     if (err) {
            //         res.status(500).send({
            //             message: "File can not be downloaded: " + err,
            //         });
            //     }
            // })

            // Delete file
            // unlink(`${req.file.destination}/${req.file.filename}`, (err) => {
            //     if (err) throw err;
            //     console.log('File was deleted');
            // });
        })
    }

    fileDescrypt(req, res, next) {
        const path = 'public/file/';
        const param = 'file';
        const upload = UploadHelper.upload(path, param)

        // Upload file
        upload(req, res, (err) => {
            const validFile = UploadHelper.checkValidFile(res, req, err);

            console.log(req.file);
            // Delete file3
            unlink(`${req.file.destination}/${req.file.filename}`, (err) => {
                if (err) throw err;
                console.log('File was deleted');
            });
        })
    }

}

module.exports = new EncryptFileController();