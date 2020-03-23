const mongoose = require('mongoose');

const AlbumSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        ref:'Artists',
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    genre: {
        type: String,
        required: true,
        default: undefined
    },
    style: {
        type: [String],
        required: true,
        default: undefined
    },
    tracklist: {
        type: [String],
        required: true,
        default: undefined
    }
});

module.exports = mongoose.model('Albums', AlbumSchema);
