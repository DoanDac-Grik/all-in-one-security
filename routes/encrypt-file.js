const express = require('express');
const router = express.Router();

const encryptFileController = require('../controllers/EncryptFileController');

router.post('/file-encrypt', encryptFileController.fileEncrypt);
router.post('/file-decrypt', encryptFileController.fileDescrypt);
router.get('/result', encryptFileController.resultFile);
router.get('/download', encryptFileController.downloadFile);
router.get('/', encryptFileController.showEncryptFile);

module.exports = router;