const mongoose = require('mongoose');
const joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const schemaUser= new mongoose.Schema({
    name:
    {
        type: String,
        minlength: 3,
        maxlength: 315,
        required: true
    },
    email:
    {
        type: String,
        minlength: 8,
        maxlength: 315,
        required: true
    },
    phone:
    {
        type: String,
        minlength: 8,
        maxlength: 100,
        required: true
    },
    actvition:
    {
        type: Boolean,
        required: true,
        default: false
    },
    avatar:
    {
        type: String,
        default: 'uploads/avatar_1587657175473.png',

    },
    password : 
    {
        type: String,
        minlength: 8,
        maxlength: 2015,
        required: true
    }
});
schemaUser.methods.generaToken = function () {
    const token = jwt.sign({_id : this._id , actvition : this.actvition},config.get('jwtPrivatKey'));
    return token ;
}
const User = mongoose.model('user', schemaUser );
async function validateUser(user) {
    const schema = await
        {
            name: joi.string().min(8).max(315).required(),
            email: joi.string().min(8).max(315).required(),
            phone: joi.string().min(8).max(100).required(),
            password: joi.string().min(8).max(315).required(),
            actvition: joi.boolean(),
        }
    return joi.validate(user, schema)
}
exports.schemaUser = schemaUser;
exports.User = User;
exports.validateUser = validateUser;