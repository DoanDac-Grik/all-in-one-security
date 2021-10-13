const express = require('express');
const morgan = require('morgan');
const ejs = require('ejs');
const path = require('path');
const route = require('./routes/index.js');

const app = express();

app.use(morgan('combined'));
app.set('view engine','ejs');
app.use('/public', express.static(path.join(__dirname,'/public')));
app.use(express.urlencoded({
    extended:true
}));
app.use(express.json());
route(app);
const port = 3000;
app.listen(port, ()=>{
    console.log(`App listening at port ${port}`)
});
