const { schemaCustomar } =require('./customar') ;
const  {schemaMovies} =require('./move') ;
const mongoose = require('mongoose');
const joi = require('joi');
const Rental = mongoose.model('rental' , new mongoose.Schema({
    customar: 
    {
        type : schemaCustomar,
        required: true
    },
    movie : 
    {
        type:schemaMovies,
        required : true ,
    },
    dateOut:
    {
        type : Date,
        default : Date.now(),
    },
    dateReturned : 
    {
        type : Date,
    },
    rentalFee : 
    {
        type : Number,
        min: 0,
    }
}));
async function validateRental(rental) {
    schema = await {
        customarId : joi.object().required(),
        movieId : joi.object().required()
    }
    return joi.validate(rental,schema)
};
exports.Rental = Rental;
exports.validateRental = validateRental;
