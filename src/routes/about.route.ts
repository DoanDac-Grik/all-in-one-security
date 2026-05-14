import { Router, Request, Response, NextFunction } from 'express';
import aboutController from '../controllers/about.controller';

const router = Router();
router.get('/', (req: Request, res: Response, next: NextFunction) =>
  aboutController.index(req, res, next),
);
export default router;
