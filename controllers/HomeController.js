class HomeController {
    /*
        Home Page
    */
    index(req, res, next) {
        res.render('home/index', {
            'title': 'Pentest - Safety first',
            'css': 'app'
        });
    }
}

module.exports = new HomeController();