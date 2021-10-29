const express = require('express');
const router = express.Router();

const blogController = require('../controllers/BlogController.js');

router.get('/search', blogController.index);
router.get('/p/:slug', blogController.detail);
router.get('/:slug', blogController.index);
router.get('/', blogController.index);

module.exports = router;