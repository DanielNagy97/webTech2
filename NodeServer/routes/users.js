const { User, validate } = require('../models/User');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
	
const jwt = require('jsonwebtoken');
const config = require('config');

router.get('/', async (req, res) => {
    try{
        const users = await User.find();
        res.json(users)
    }catch(err){
        res.json({message: err})
    }
});
 
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
