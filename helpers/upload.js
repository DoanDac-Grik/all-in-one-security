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

        const upload = multer({ storage: storage }).single(param);

        return upload;
    }
}

module.exports = new UploadHelper();