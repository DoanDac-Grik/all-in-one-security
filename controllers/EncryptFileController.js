class EncryptFileController {
    showEncryptFile(req, res, next) {
        res.render('Pentest/encrypt-file', {
            'title': 'Ecryption file',
            'css': 'web'
        });
    }
}

module.exports = new EncryptFileController();