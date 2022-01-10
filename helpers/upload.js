const multer  = require('multer');
const path = require('path');

class UploadHelper {
    upload(pathFolder, param) {
        // Image storage
        const storage = multer.diskStorage({
            destination: function(req, file, cb) {
                cb(null, pathFolder);
            },
        
            // By default, multer removes file extensions so let's add them back
            filename: function(req, file, cb) {
                cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
            }
        });

        const upload = multer({
            storage: storage,
            limits: {
                fileSize: 1 * 1024 * 1024 // 2MB
            }
        }).single(param);

        return upload;
    }

    checkValidFile(res, req, err) {
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        } else if (!req.file) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                req.flash('message', 'File too large');
                return res.redirect('/encrypt-file');
            }
            return res.send('Please select a file to upload');
        } else if (err instanceof multer.MulterError) {
            return res.send(err);
        } else if (err) {
            return res.send(err);
        }

        return true;
    }
}

module.exports = new UploadHelper();