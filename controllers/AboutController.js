class AboutController {
    /*
        About Page
    */
    index(req, res, next) {
        res.render('Team/about', {
            'title': 'About us',
            'css': 'about'
        });
    }
}

module.exports = new AboutController();