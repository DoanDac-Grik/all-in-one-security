import { Request, Response, NextFunction } from 'express';

class HomeController {
  index(_req: Request, res: Response, _next: NextFunction): void {
    res.render('Home/index', { title: 'Pentest - Safety first', css: 'app' });
  }
}

export default new HomeController();
