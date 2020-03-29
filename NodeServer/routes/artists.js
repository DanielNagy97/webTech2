const express = require('express');
const router = express.Router();

const Artist = require('../models/Artist');

//Post a new artist
router.post('/', async (req, res) => {
    const artist = new Artist({
        name: req.body.name,
        country: req.body.country,
        description: req.body.description,
        postedBy: req.body.postedBy
    });
    try{
    const saveArtist = await artist.save();
    res.json(saveArtist);
    }catch(err){
        res.json({message: err})
    }
});

//Get all the artists
//NOTE: Needs limiting and/or slicing
router.get('/', async (req, res) => {
    try{
        const artists = await Artist.find().populate('postedBy', ['name', 'email']);
        res.json(artists)
    }catch(err){
        res.json({message: err})
    }
});

//Get artists by ordering by name
//:order can be 1/-1 or asc/desc
router.get('/sortName/:order', async (req, res) => {
    try{
        const artists = await Artist.find({}).sort({name: req.params.order})
        res.json(artists)
    }catch(err){
        res.json({message: err})
    }
});

//Get artist by given id in params
router.get('/:artistId', async (req, res) =>{
    try{
        const artist = await Artist.findById(req.params.artistId).populate('postedBy', ['name','email']);
        res.json(artist);
    }catch(err){
        res.json({message: err});
    }
});

//Get artists posted by given user in param
router.get('/postedBy/:userId', async (req, res) =>{
    try{
        const artist = await Artist.find({postedBy: req.params.userId})
        .populate('postedBy', ['name', 'email']);
        res.json(artist);
    }catch(err){
        res.json({message: err});
    }
});

//Delete artist by given id in params
router.delete('/:artistId', async (req, res) =>{
    try{
        const removedArtist = await Artist.deleteOne({_id: req.params.artistId});
        res.json(removedArtist)
    }catch(err){
        res.json({message: err});
    }
})

//Update an artist with an id from params
//All fields gets updated
//NOTE: If a field is undefined, the value will be null
router.patch('/:artistId', async (req, res) =>{
    try{
        const updatedArtist = await Artist.updateOne({_id: req.params.artistId},
            {$set: {
                name: req.body.name,
                country: req.body.country,
                description: req.body.description
            }
        });
        res.json(updatedArtist)
    }catch(err){
        res.json({message: err});
    }
})

module.exports = router;
