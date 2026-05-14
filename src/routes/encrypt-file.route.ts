import { Router, Request, Response, NextFunction } from 'express';
import encryptFileController from '../controllers/encrypt-file.controller';

const router = Router();
router.post('/encrypt', (req: Request, res: Response, next: NextFunction) =>
  encryptFileController.fileEncrypt(req, res, next),
);
router.post('/decrypt', (req: Request, res: Response, next: NextFunction) =>
  encryptFileController.fileDescrypt(req, res, next),
);
router.get('/result', (req: Request, res: Response, next: NextFunction) =>
  encryptFileController.resultFile(req, res, next),
);
router.get('/download', (req: Request, res: Response, next: NextFunction) =>
  encryptFileController.downloadFile(req, res, next),
);
router.get('/', (req: Request, res: Response, next: NextFunction) =>
  encryptFileController.showEncryptFile(req, res, next),
);
export default router;
