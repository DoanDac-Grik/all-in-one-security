const homeRouter = require('./home');
const aboutRouter = require('./about');
const blogRouter = require('./blog');
const pentestRouter = require('./pentest');
const froalaRouter = require('./froala');

function route(app){
    app.use('/upload', froalaRouter);
    app.use('/pentest-demo', pentestRouter);
    app.use('/about', aboutRouter);
    app.use('/blog', blogRouter);
    app.use('/', homeRouter);
}

module.exports= route;