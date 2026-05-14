import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import path from 'path';
import flash from 'connect-flash';
import expressLayouts from 'express-ejs-layouts';
import session from 'express-session';
import route from './routes/index';
import db from './config/db';

void db.connect();

const app = express();

app.use(morgan('combined'));
app.use(
  session({
    secret: process.env.SESSION_SECRET ?? 'changeme',
    saveUninitialized: true,
    resave: true,
  }),
);
app.use(flash());

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', './layouts/layout');

// static files — __dirname points to dist/ at runtime, so go one level up
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

route(app);

app.use((_req: Request, res: Response, _next: NextFunction) => {
  res.status(404).render('exception/404.ejs', { layout: false });
});

export default app;
