const express = require('express');
const router = express.Router();

const blogController = require('../controllers/BlogController.js');

router.get('/search', blogController.index);
router.get('/create', blogController.create);
router.post('/store', blogController.store);

// Detail
router.get('/p/:slug', blogController.detail);

// Category
router.get('/:slug', blogController.index);

// Post index
router.get('/', blogController.index);

module.exports = router;