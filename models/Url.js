
const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    // 'urlCode' will store the unique short code generated for each URL.
    urlCode: {
        type: String,
        required: true,
    },
    longUrl: {
        type: String,
        required: true,
    },
    shortUrl: {
        type: String,
        required: true,
    },
    clicks: {
        type: Number,
        required: true,
        default: 0,
    },
    date: {
        type: Date,
        default: Date.now,
    },

});


module.exports = mongoose.model('Url', urlSchema);