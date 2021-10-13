const pentestRouter = require('./pentest');

function route(app){
    app.use('/pentest-demo', pentestRouter);
}
module.exports= route;