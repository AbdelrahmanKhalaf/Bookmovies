var express = require('express');
var router = express.Router();
var multer = require('multer');
const joi = require('joi')
const bcrypt = require('bcrypt');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const config = require('config');
const {User} =  require('../model/user') ;
router.post('/', async (req,res)=>{
    const {error} = validateUser(req.body);
    if(error) return res.status(400).send(error.details[0].message) ;
    let user = await User.findOne({email : req.body.email});
    if(!user) return res.status(400).send('invalid email / or password');
    let validPassword  =  await User.findOne({password : req.body.password});
    if (!validPassword) return res.status(400).send('invalid email 2/ or password');
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password,salt)
    await user.save();
    const token = user.generaToken()
    res.header('x-auth-token',token)
});
async function validateUser(auth) {
    const schema = await
        {
            email: joi.string().min(8).max(315).required(),
            password: joi.string().min(8).max(315).required(),
        }
    return joi.validate(auth, schema)
}

module.exports = router;