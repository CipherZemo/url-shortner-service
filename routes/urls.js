const express = require('express');
const router = express.Router();

const { shortenUrl } = require('../controllers/urlController');
const auth = require('../middleware/auth');

router.post('/shorten',auth, shortenUrl);



module.exports = router;