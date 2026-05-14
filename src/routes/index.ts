import { Application } from 'express';
import homeRouter from './home.route';
import aboutRouter from './about.route';
import blogRouter from './blog.route';
import froalaRouter from './froala.route';
import urlPentestRouter from './url-pentest.route';
import filePentestRouter from './file-pentest.route';
import webPentestRouter from './web-pentest.route';
import encryptFileRouter from './encrypt-file.route';

export default function route(app: Application): void {
  app.use('/upload', froalaRouter);
  app.use('/url-pentest', urlPentestRouter);
  app.use('/file-pentest', filePentestRouter);
  app.use('/web-pentest', webPentestRouter);
  app.use('/encrypt-file', encryptFileRouter);
  app.use('/about', aboutRouter);
  app.use('/blog', blogRouter);
  app.use('/', homeRouter);
}
