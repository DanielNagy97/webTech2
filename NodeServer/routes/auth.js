const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../models/User');
const express = require('express');
const router = express.Router();


const config = require('config');
 
router.post('/', async (req, res) => {
    // Validate The Request
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    // find the user by email
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send('Incorrect email or password.');
    }
    // validate the Credentials in MongoDB match, which provided in the request
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).send('Incorrect email or password.');
    }

    const token = jwt.sign({ _id: user._id }, config.get('PrivateKey'), {expiresIn: "3 hours"});
    res.send({
        userID: user._id,
        token: token
    });
    

});

function validate(req) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };
 
    return Joi.validate(req, schema);
}
 
module.exports = router;