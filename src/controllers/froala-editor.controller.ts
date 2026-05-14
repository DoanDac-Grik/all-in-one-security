import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import UploadHelper from '../helpers/upload.helper';

class FroalaEditorController {
  uploadImage(req: Request, res: Response, next: NextFunction): void {
    const uploadPath = 'public/img/post_detail/';
    const upload = UploadHelper.upload(uploadPath, 'image_detail_post');

    upload(req, res, (err: unknown) => {
      if (req.fileValidationError) return res.send(req.fileValidationError);
      if (!req.file) return res.send('Please select an image to upload');
      if (err instanceof multer.MulterError) return res.send(err.message);
      if (err) return next(err);

      const imagePath = { link: `/img/post_detail/${req.file.filename}` };
      res.send(JSON.stringify(imagePath));
    });
  }
}

export default new FroalaEditorController();
