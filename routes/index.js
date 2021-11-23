const homeRouter = require('./home');
const aboutRouter = require('./about');
const blogRouter = require('./blog');
const froalaRouter = require('./froala');
const urlPentestRouter = require('./url-pentest');
const filePentestRouter = require('./file-pentest');
const webPentestRouter = require('./web-pentest');
const encryptFileRouter = require('./encrypt-file');

function route(app){
    app.use('/upload', froalaRouter);
    app.use('/url-pentest', urlPentestRouter);
    app.use('/file-pentest', filePentestRouter);
    app.use('/web-pentest', webPentestRouter);
    app.use('/encrypt-file', encryptFileRouter);
    app.use('/about', aboutRouter);
    app.use('/blog', blogRouter);
    app.use('/', homeRouter);
}

module.exports= route;