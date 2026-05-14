import { Router, Request, Response, NextFunction } from 'express';
import froalaEditorController from '../controllers/froala-editor.controller';

const router = Router();
router.post('/', (req: Request, res: Response, next: NextFunction) =>
  froalaEditorController.uploadImage(req, res, next),
);
export default router;
