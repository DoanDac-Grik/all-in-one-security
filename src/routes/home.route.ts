import { Router, Request, Response, NextFunction } from 'express';
import homeController from '../controllers/home.controller';

const router = Router();
router.get('/', (req: Request, res: Response, next: NextFunction) =>
  homeController.index(req, res, next),
);
export default router;
