import { Request, Response, NextFunction } from 'express';

class AboutController {
  index(_req: Request, res: Response, _next: NextFunction): void {
    res.render('Team/about', { title: 'About us', css: 'about' });
  }
}

export default new AboutController();
