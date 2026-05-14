const express = require('express');
const morgan = require('morgan');
const ejs = require('ejs');
const path = require('path');
const flash = require('connect-flash');
var expressLayouts = require("express-ejs-layouts");
const session = require('express-session');
const route = require('./routes/index.js');
const app = express();
const db = require('./config/db');

// Connect to DB
db.connect();

app.use(morgan('combined'));

app.use(session({
    secret: 'geeksforgeeks',
    saveUninitialized: true,
    resave: true
}));

app.use(flash());

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(expressLayouts);
app.set('layout', './layouts/layout')
app.set('view engine','ejs');


// Use static file
app.use(express.static(path.join(__dirname, 'public')));


app.use(express.urlencoded({
    extended:true
}));
app.use(express.json());
route(app);

app.use(function (req, res, next) {
    //Capture All 404 errors
    res.status(404).render("exception/404.ejs", {
        layout: false
    });
});

const port = 3001;
app.listen(port, ()=>{
    console.log(`App listening at port ${port}`)
});
