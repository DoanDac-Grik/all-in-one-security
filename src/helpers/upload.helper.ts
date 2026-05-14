import multer from 'multer';
import path from 'path';
import { Request, Response } from 'express';

class UploadHelper {
  upload(pathFolder: string, param: string) {
    const storage = multer.diskStorage({
      destination(_req, _file, cb) {
        cb(null, pathFolder);
      },
      filename(_req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
      },
    });

    return multer({
      storage,
      limits: { fileSize: 2 * 1024 * 1024 },
    }).single(param);
  }

  checkValidFile(res: Response, req: Request, err: unknown): boolean {
    if (req.fileValidationError) {
      res.send(req.fileValidationError);
      return false;
    }
    if (!req.file) {
      if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
        req.flash('message', 'File too large');
        res.redirect('/encrypt-file');
        return false;
      }
      res.send('Please select a file to upload');
      return false;
    }
    if (err instanceof multer.MulterError) {
      res.send(err.message);
      return false;
    }
    if (err) {
      res.send(String(err));
      return false;
    }
    return true;
  }
}

export default new UploadHelper();
