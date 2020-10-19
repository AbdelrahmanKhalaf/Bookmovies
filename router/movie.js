var express = require('express');
var router = express.Router();
const {Movies,validateMovies} = require( '../model/move');
const  {Genre,validateGenre} = require('../model/genre') ;
router.get('/', async (req,res)=>{
    const movie = await Movies.find().sort('name');
    res.send(movie);
});
router.post('/', async (req,res)=>{
    const {error} = validateMovies(req.body);
    if(error) return res.status(400).send(error.details[0].message) ;

    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(404).send("invalid genre");
    let movie = new Movies({
        title : req.body.title,
        genre : [
            {
                _id :genre._id,
                 name : genre.name
            },
        ],
        numberInStock:req.body.numberInStock,
        dailyRentalRate:req.body.dailyRentalRate,
    })
    movie = await movie.save()
    res.send(movie);
});
router.put('/:id', async (req,res)=>{
    const {error} = validateMovies(req.body);
    if(error) return res.status(400).send(error.details[0].message) ;

    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(404).send("invalid genre");
    let movie = Movies.findByIdAndUpdate(req.body.id,{
        title : req.body.title,
        genre : 
        {
            _id :genre._id,
             name : genre.name
        },
        numberInStock:req.body.numberInStock,
        dailyRentalRate:req.body.dailyRentalRate,
    },{new:true});
    if(!movie) return res.status(404).send("The movie with the Given ID was not found ");
    res.send(movie);
});
router.delete('/:id', async (req,res)=>{
    const {error} = validateMovies(req.body);
    if(error) return res.status(400).send(error.details[0].message) ;
    const movie = await Movies.findByIdAndDelete(req.body.id);
    if(!movie) return res.status(404).send("The movie with the Given ID was not found ");
    res.send('done well, The movie was deleted successfully');
});
router.get('/:id',async (req,res)=>{
    const {error} = validateMovies(req.body);
    if(error) return res.status(400).send(error.details[0].message) ;
    const movie = await Movies.findById(req.body.id);
    if(!movie) return res.status(404).send("The movie with the Given ID was not found ");
    res.send(movie);
})
module.exports = router;