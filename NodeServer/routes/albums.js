const express = require('express');
const router = express.Router();

const Album = require('../models/Album');

//Post a new album
router.post('/', async (req, res) => {
    const album = new Album({
        title: req.body.title,
        artist: req.body.artist,
        year: req.body.year,
        genre: req.body.genre,
        style: req.body.style,
        tracklist: req.body.tracklist,
        postedBy: req.body.postedBy
    });
    try{
    const saveAlbum = await album.save();
    res.json(saveAlbum);
    }catch(err){
        res.json({message: err})
    }
});

//Get all the albums
//NOTE: Needs limiting and/or slicing
router.get('/', async (req, res) => {
    try{
        const albums = await Album.find()
        .populate('artist', ['name', 'country']);
        res.json(albums)
    }catch(err){
        res.json({message: err})
    }
});

//Get albums by ordering by title
//:order can be 1/-1 or asc/desc
router.get('/sortTitle/:order', async (req, res) => {
    try{
        const albums = await Album.find({}).sort({title: req.params.order})
        res.json(albums)
    }catch(err){
        res.json({message: err})
    }
});

//Get album by given id in params
router.get('/:albumId', async (req, res) =>{
    try{
        const album = await Album.findById(req.params.albumId)
        .populate('artist', ['name', 'country'])
        .populate('postedBy', ['name', 'email']);
        res.json(album);
    }catch(err){
        res.json({message: err});
    }
});

//Get albums posted by given user in param
router.get('/postedBy/:userId', async (req, res) =>{
    try{
        const album = await Album.find({postedBy: req.params.userId})
        .populate('artist', ['name', 'country'])
        .populate('postedBy', ['name', 'email']);
        res.json(album);
    }catch(err){
        res.json({message: err});
    }
});

//Delete album by given id in params
router.delete('/:albumId', async (req, res) =>{
    try{
        const removedAlbum = await Album.deleteOne({_id: req.params.albumId});
        res.json(removedAlbum)
    }catch(err){
        res.json({message: err});
    }
})

//Update an album with an id from params
//All fields gets updated
//NOTE: If a field is undefined, the value will be null
router.patch('/:albumId', async (req, res) =>{
    try{
        const updatedAlbum = await Album.updateOne({_id: req.params.albumId},
            {$set: {
                title: req.body.title,
                artist: req.body.artist,
                year: req.body.year,
                genre: req.body.genre,
                style: req.body.style,
                tracklist: req.body.tracklist
            }
        });
        res.json(updatedAlbum)
    }catch(err){
        res.json({message: err});
    }
})

module.exports = router;
