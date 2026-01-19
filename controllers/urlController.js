// controllers/urlController.js
const Url = require('../models/Url');
const validUrl = require('valid-url'); //library to validate the format of the incoming URL

/**
 * @desc    This function will be responsible for creating a new short URL.
 * @route   POST /api/shorten
 * @access  Public
 */

const shortenUrl = async (req, res) => {
    const { longUrl } = req.body;
    console.log('Received long URL:', longUrl);

    if (!longUrl) {
        return res.status(400).json({ success: false, error: 'Please provide a URL' });
    }

    if (!validUrl.isUri(longUrl)) {
        return res.status(400).json({ success: false, error: 'Invalid URL format provided' });
    } //url validation

    try {
        let url = await Url.findOne({ longUrl: longUrl }); //1st one is the schema field,2nd one is here's variable 
        if (url) {
            return res.status(200).json({ success: true, data: url });
        }
        // Dynamically import the 'nanoid' package. This is the modern way to import an ES Module into a CommonJS file within an async function since nanoid are published as ES Modules (ESM), which use the 'import' syntax. You cannot directly require() an ESM package in a CommonJS file
        const { nanoid } = await import('nanoid');
        const urlCode = nanoid(7);

        const shortUrl = `${process.env.BASE_URL}/${urlCode}`;
        url = await Url.create({ longUrl, shortUrl, urlCode });

        res.status(201).json({ success: true, data: url });
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }

};


module.exports = {
    shortenUrl,
};