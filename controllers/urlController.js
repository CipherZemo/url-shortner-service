const Url = require('../models/Url');
const validUrl = require('valid-url'); //library to validate the format of the incoming URL

const shortenUrl = async (req, res) => {
    const { longUrl } = req.body;

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
        const { nanoid } = await import('nanoid');//A tiny, secure, URL-friendly, unique string ID generator for JavaScript
        const urlCode = nanoid(7);

        const shortUrl = `${process.env.BASE_URL}/${urlCode}`;
        const newUrlData = {
            longUrl,
            shortUrl,
            urlCode,
        };
        if (req.user) {
            newUrlData.user = req.user.id;
        }

        url = await Url.create(newUrlData);
        //We pass our constructed data object to Url.create(). Mongoose is smart; if the user property exists on the object, it will save it to the document. If it doesn't, it will be omitted, which is exactly what we want for an anonymous guest.
        res.status(201).json({ success: true, data: url });
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }

};

const redirectToUrl = async (req, res) => {
    try {
        const url = await Url.findOne({ urlCode: req.params.code });

        if (url) {
            url.clicks++;
            await url.save();
            return res.redirect(302, url.longUrl);// We are specifying a 301 status for a temporary redirect(not cached).
        } else {
            return res.status(404).json({ success: false, error: 'No URL found' });
        }

    } catch (err) {
        console.error('Server error on redirect:', err);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}

module.exports = {
    shortenUrl, redirectToUrl,
};