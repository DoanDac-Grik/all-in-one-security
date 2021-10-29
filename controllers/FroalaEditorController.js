const multer  = require('multer');
const path = require('path');
const UploadHelper = require('../helpers/upload');

class FroalaEditorController {
    /*
        Upload image
    */
    uploadImage(req, res, next) {
        let path = 'public/img/post_detail/';
        let param = 'image_detail_post';
        const upload = UploadHelper.upload(path, param);

        // Upload image
        upload(req, res, function(err) {
            if (req.fileValidationError) {
                return res.send(req.fileValidationError);
            }
            else if (!req.file) {
                return res.send('Please select an image to upload');
            }
            else if (err instanceof multer.MulterError) {
                return res.send(err);
            }
            else if (err) {
                return res.send(err);
            }

            var imagePath = {
                link: `/img/post_detail/${req.file.filename}`
            };

            // Response path
            res.send(JSON.stringify(imagePath));
        });
    }
}

module.exports = new FroalaEditorController();