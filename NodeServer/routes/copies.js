const express = require('express');
const router = express.Router();

const Copy = require('../models/Copies');

//Post a new copy
router.post('/', async (req, res) => {
    const copy = new Copy({
        owner: req.body.owner,
        album: req.body.album,
        madeIn: req.body.madeIn,
        releaseYear: req.body.releaseYear,
        mediaCond: req.body.mediaCond,
        sleeveCond: req.body.sleeveCond,
        rating: req.body.rating
    });
    try{
    const saveCopy = await copy.save();
    res.json(saveCopy);
    }catch(err){
        res.json({message: err})
    }
});

//Get all the copies
//NOTE: Needs limiting and/or slicing
router.get('/', async (req, res) => {
    try{
        const copies = await Copy.find()
        .populate('owner', ['name', 'email'])
        .populate({ 
            path: 'album',
                select: ['title', 'artist', 'year'],
            populate: {
                path: 'artist',
                select: ['name']
            }});

        res.json(copies)
    }catch(err){
        res.json({message: err})
    }
});

//Get copy by given id in params
router.get('/:copyId', async (req, res) =>{
    try{
        const copy = await Copy.findById(req.params.copyId)
        .populate('owner', ['name', 'email'])
        .populate({ 
            path: 'album',
            populate: {
                path: 'artist'
            }});

        res.json(copy);
    }catch(err){
        res.json({message: err});
    }
});

//Get artists posted by given user in param
router.get('/owner/:userId', async (req, res) =>{
    try{
        const copies = await Copy.find({owner: req.params.userId})
        .populate('owner', ['name', 'email'])
        .populate({ 
            path: 'album',
                select: ['title', 'artist', 'year'],
            populate: {
                path: 'artist',
                select: ['name']
            }});
        res.json(copies);
    }catch(err){
        res.json({message: err});
    }
});

//Delete artist by given id in params
router.delete('/:copyId', async (req, res) =>{
    try{
        const removedCopy = await Copy.deleteOne({_id: req.params.copyId});
        res.json(removedCopy)
    }catch(err){
        res.json({message: err});
    }
})

//Update a copy with an id from params
//All fields gets updated
//NOTE: If a field is undefined, the value will be null
router.patch('/:CopyId', async (req, res) =>{
    try{
        const updatedCopy = await Copy.updateOne({_id: req.params.CopyId},
            {$set: {
                owner: req.body.owner,
                album: req.body.album,
                madeIn: req.body.madeIn,
                releaseYear: req.body.releaseYear,
                mediaCond: req.body.mediaCond,
                sleeveCond: req.body.sleeveCond,
                rating: req.body.rating
            }
        });
        res.json(updatedCopy)
    }catch(err){
        res.json({message: err});
    }
})

module.exports = router;
