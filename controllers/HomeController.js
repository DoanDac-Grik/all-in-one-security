class HomeController {
    /*
        Home Page
    */
    index(req, res, next) {
        res.render('Home/index', {
            'title': 'Pentest - Safety first',
            'css': 'app'
        });
        
    }
}

module.exports = new HomeController();