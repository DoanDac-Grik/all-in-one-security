import { Request, Response, NextFunction } from 'express';
import fs, { unlink, stat } from 'fs';
import crypto from 'crypto';
import path from 'path';
import zlib from 'zlib';
import generatePassword from 'password-generator';
import UploadHelper from '../helpers/upload.helper';
import AppendInitVect from '../helpers/append-init-vector.helper';
import { getCipherKey } from '../helpers/file-encrypt.helper';

const RESULT_FOLDER = path.join(process.cwd(), 'public', 'file', 'result');

class EncryptFileController {
  showEncryptFile(req: Request, res: Response, _next: NextFunction): void {
    res.render('Pentest/encrypt-file', {
      title: 'Encryption file',
      css: 'file',
      message: req.flash('message'),
    });
  }

  resultFile(req: Request, res: Response, _next: NextFunction): void {
    const key = (req.query.key as string) || null;
    const filename = (req.query.filename as string) || null;
    const ext = (req.query.ext as string) || null;
    const action = key ? 'Encrypt' : 'Decrypt';

    if (filename) {
      stat(path.join(RESULT_FOLDER, filename), (err, stats) => {
        if (err) {
          console.log(`File doesn't exist.`);
        } else {
          res.render('ResultPentest/encrypt-decrypt', {
            title: 'File result',
            css: 'result-file-en-de',
            key,
            action,
            filename,
            filesize: stats.size,
            ext,
          });
        }
      });
    } else {
      res.status(404).render('exception/404.ejs', { layout: false });
    }
  }

  downloadFile(req: Request, res: Response, _next: NextFunction): void {
    const filename = (req.query.filename as string) || null;

    if (filename) {
      const filePath = path.join(RESULT_FOLDER, filename);
      res.download(filePath, (err) => {
        if (err) {
          res.status(500).send({ message: 'File can not be downloaded: ' + String(err) });
          return;
        }
        unlink(filePath, (unlinkErr) => {
          if (unlinkErr) throw unlinkErr;
          console.log('File was deleted');
        });
      });
    }
  }

  fileEncrypt(req: Request, res: Response, next: NextFunction): void {
    const upload = UploadHelper.upload(RESULT_FOLDER, 'file');

    upload(req, res, (err: unknown) => {
      const valid = UploadHelper.checkValidFile(res, req, err);
      if (!valid) return;

      const file = req.file!;
      try {
        const pwLength = parseInt(process.env.PASSWORD_GENERATE_LENGTH ?? '20', 10);
        const password = generatePassword(pwLength, true);
        const initVect = crypto.randomBytes(16);
        const cipherKey = getCipherKey(password);

        const readStream = fs.createReadStream(path.join(RESULT_FOLDER, file.filename));
        const gzip = zlib.createGzip();
        const cipher = crypto.createCipheriv('aes256', cipherKey, initVect);
        const appendInitVect = new AppendInitVect(initVect);
        const writeStream = fs.createWriteStream(path.join(RESULT_FOLDER, file.filename + '.enc'));

        readStream
          .pipe(gzip)
          .pipe(cipher)
          .pipe(appendInitVect)
          .pipe(writeStream)
          .on('finish', () => {
            unlink(path.join(RESULT_FOLDER, file.filename), (unlinkErr) => {
              if (unlinkErr) throw unlinkErr;
              res.redirect(`/encrypt-file/result?key=${password}&filename=${file.filename}.enc`);
            });
          });
      } catch (error) {
        console.log(error);
        next(error);
      }
    });
  }

  fileDescrypt(req: Request, res: Response, _next: NextFunction): void {
    const upload = UploadHelper.upload(RESULT_FOLDER, 'file');

    upload(req, res, (err: unknown) => {
      const valid = UploadHelper.checkValidFile(res, req, err);
      if (!valid) return;

      const file = req.file!;
      const exts = file.originalname.split('.');
      const fileExt = exts[exts.length - 2];
      const password = (req.body as { secretDescrypt: string }).secretDescrypt;

      const readInitVect = fs.createReadStream(path.join(RESULT_FOLDER, file.filename), {
        end: 15,
      });
      let initVect: Buffer = Buffer.alloc(16);

      readInitVect.on('data', (chunk) => {
        initVect = chunk as Buffer;
      });

      readInitVect.on('close', () => {
        const cipherKey = getCipherKey(password);
        const readStream = fs.createReadStream(path.join(RESULT_FOLDER, file.filename), {
          start: 16,
        });
        const decipher = crypto.createDecipheriv('aes256', cipherKey, initVect);
        const unzip = zlib.createUnzip();
        const writeStream = fs.createWriteStream(
          path.join(RESULT_FOLDER, file.filename + '.unenc'),
        );

        readStream
          .pipe(decipher)
          .on('error', () => {
            req.flash('message', 'Key is not correct');
            res.redirect('/encrypt-file');
          })
          .pipe(unzip)
          .on('error', (e: Error) => console.log(e))
          .pipe(writeStream)
          .on('finish', () => {
            unlink(path.join(RESULT_FOLDER, file.filename), (unlinkErr) => {
              if (unlinkErr) throw unlinkErr;
              res.redirect(`/encrypt-file/result?filename=${file.filename}.unenc&ext=${fileExt}`);
            });
          });
      });
    });
  }
}

export default new EncryptFileController();
