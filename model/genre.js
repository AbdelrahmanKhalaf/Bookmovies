const mongoose = require('mongoose');
const joi = require('joi')
const genreSchema = new mongoose.Schema({
    name : 
    {
        type:String,
        required:true,
        minlength:3,
        maxlength:50
    }
})
const Genre = mongoose.model('genre',genreSchema);
function validateGenre(genre) {
    const schema = 
    {
        name : joi.string().min(3).max(50).required()
    }
 return joi.validate(genre,schema)   
}
exports.Genre = Genre ;
exports.genreSchema = genreSchema;
exports.validateGenre = validateGenre;