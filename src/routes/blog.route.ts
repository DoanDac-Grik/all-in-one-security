import { Router, Request, Response, NextFunction } from 'express';
import blogController from '../controllers/blog.controller';

const router = Router();
router.get('/create', (req: Request, res: Response, next: NextFunction) =>
  blogController.create(req, res, next),
);
router.post('/', (req: Request, res: Response, next: NextFunction) =>
  blogController.store(req, res, next),
);
router.get('/:slug', (req: Request, res: Response, next: NextFunction) =>
  blogController.detail(req, res, next),
);
router.get('/', (req: Request, res: Response, next: NextFunction) =>
  blogController.index(req, res, next),
);
export default router;
