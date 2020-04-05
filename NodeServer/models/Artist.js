const mongoose = require('mongoose');

//User = require('./User'), userSchema = User.schema;

const ArtistSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    country: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    postedBy: {
        type: String,
        ref:'User',
        required: true
    }
});

module.exports = mongoose.model('Artists', ArtistSchema);
