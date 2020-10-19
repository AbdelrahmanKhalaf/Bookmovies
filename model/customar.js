const mongoose = require('mongoose');
const joi = require('joi')
const schemaCustomar = new mongoose.Schema({
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

    }
})
const Customar = mongoose.model('customar', schemaCustomar );
async function validateCustomar(customar) {
    const schema = await
        {
            name: joi.string().min(8).max(315).required(),
            email: joi.string().min(8).max(315).required(),
            phone: joi.string().min(8).max(100).required(),
            password: joi.string().min(8).max(315).required(),
            actvition: joi.boolean()
        }
    return joi.validate(customar, schema)
}
exports.schemaCustomar = schemaCustomar;
exports.Customar = Customar;
exports.validateCustomar = validateCustomar;