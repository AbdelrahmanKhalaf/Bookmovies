const  {Customar}= require('../model/customar') ;
const {Movies} =  require('../model/move') ;
const {Rental,validateRental} = require('../model/rental') ;
var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Fawn = require('fawn');
Fawn.init(mongoose);
router.get('/', async (req,res)=>{
 const rental = await Rental.find().sort('-dateOut');
 res.send(rental);
});
router.post('/', async (req,res)=>{
    const {error} = validateRental(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const movie = await Movies.findById(req.body.movieId);
    if(!movie) return res.status(404).send("invalid movie");

    const customar = await Customar.findById(req.body.customarId);
    if(!customar) return res.status(404).send("invalid customar");
    if(movie.numberInStock === 0 ) return res.status(404).send('movie not in stock');
    const rental = new Rental({
        customar : 
        {
            _id : customar._id,
            name : customar.name,
            phone : customar.phone,
        },
        movie : 
        {
            _id : movie._id,
            title : movie.title,
            dailyRentalRate : movie.dailyRentalRate,
        },

    })


    try{
        new Fawn.Task()
        .save('rentals',rental)
        .update('moves',{_id: movie._id },
        {
            $inc: {
                numberInStock : -1
            }
         
    
        }
        )
        .run();
        res.send(rental);

    }
    catch(ex){
        res.status(500).send('somthing failed .')
    }
});
router.get('/:id', async (req,res)=>{
    const rental = Rental.findById(req.body.id);
    if(!rental) return res.status(404).send("The rental with the Given ID was not found ");
    res.send(rental)
});
module.exports = router;