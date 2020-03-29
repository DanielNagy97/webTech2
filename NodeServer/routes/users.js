const { User, validate } = require('../models/User');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
	
const jwt = require('jsonwebtoken');
const config = require('config');

const expressjwt = require("express-jwt");

const jwtCheck = expressjwt({    
    secret: config.get('PrivateKey')
});

router.get('/', async (req, res) => {
    try{
        const users = await User.find({},'name email');
        res.json(users)
    }catch(err){
        res.json({message: err})
    }
});

//Get user by given id in params
router.get('/:userId', jwtCheck, async (req, res) =>{
    try{
        const user = await User.findById(req.params.userId);
        res.json({
            name:user.name,
            email:user.email
        });
    }catch(err){
        res.json({message: err});
    }
});

//Delete user by given id in params
router.delete('/:userId', jwtCheck, async (req, res) =>{
    try{
        const removedUser = await User.deleteOne({_id: req.params.userId});
        res.json(removedUser)
    }catch(err){
        res.json({message: err});
    }
})

//Modify password
router.patch('/:userId', jwtCheck, async (req, res) =>{
    try{
        const salt = await bcrypt.genSalt(10);
        let saltedPassword = await bcrypt.hash(req.body.password, salt);

        const updatedUser = await User.updateOne({_id: req.params.userId},
            {$set: {
                name: req.body.name,
                email: req.body.email,
                password: saltedPassword
            }
        });
        res.json(updatedUser)
    }catch(err){
        res.json({message: err});
    }
})

//Post new user
router.post('/', async (req, res) => {
    // Validate The Request
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
 
    // Check if this user already exisits
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).send('That user already exisits!');
    } else {
        // if not insert it
        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        const token = jwt.sign({ _id: user._id }, config.get('PrivateKey'), {expiresIn: "3 hours"});

        res.header('x-auth-token', token).send(user);
    }
});
 
module.exports = router;
