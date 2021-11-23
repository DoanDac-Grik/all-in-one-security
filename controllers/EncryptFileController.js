class EncryptFileController {
    showEncryptFile(req, res, next) {
        res.render('pentest/encrypt-file', {
            'title': 'Ecryption file',
            'css': 'web'
        });
    }
}

module.exports = new EncryptFileController();