const mongoose = require('mongoose');
const joi = require('joi')
const { genreSchema } = require('./genre');
const schemaMovies = new mongoose.Schema({
    title:
    {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255,
    },
    genre: {
        type: genreSchema,
        required: true
    }
,
    numberInStock:
    {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate:
    {
        type: Number,
        required: true,
        min: 0,
        max: 255,
    }
})
const Movies = mongoose.model('move', schemaMovies);
async function validateMovies(movies) {
    const Schema = await
        {
            title: joi.string().min(10).max(50).required(),
            genreId: joi.array().required(),
            numberInStock: joi.number().required().min(0),
            dailyRentalRate: joi.number().min(0).required(),
        }
    return joi.validate(movies, Schema)
}
exports.schemaMovies = schemaMovies,
    exports.Movies = Movies;
exports.validateMovies = validateMovies;