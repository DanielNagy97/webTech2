const mongoose = require('mongoose');

const CopiesSchema = mongoose.Schema({
    owner: {
        type: String,
        ref:'User',
        required: true
    },
    album: {
        type: String,
        ref:'Albums',
        required: true
    },
    madeIn:{
        type: String,
        required: true
    },
    releaseYear:{
        type: Number,
        required: true
    },
    mediaCond: {
        type: String,
        enum: ['Mint', 'Near Mint', 'Very Good Plus', 'Very Good', 'Good Plus', 'Good', 'Fair', 'Poor'],
        required: true
    },
    sleeveCond: { 
        type: String,
        enum: ['Mint', 'Near Mint', 'Very Good Plus', 'Very Good', 'Good Plus', 'Good', 'Fair', 'Poor'],
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    }
});

module.exports = mongoose.model('Copies', CopiesSchema);
