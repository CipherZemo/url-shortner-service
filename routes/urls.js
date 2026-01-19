const express = require('express');
const router = express.Router();

const { shortenUrl } = require('../controllers/urlController');


// --- Add the new route definition below ---

/**
 * @route   POST /api/shorten
 * @desc    Create a new short URL
 * @access  Public
 */

router.post('/shorten', shortenUrl);


module.exports = router;