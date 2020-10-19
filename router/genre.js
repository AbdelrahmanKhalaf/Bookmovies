var express = require('express');
var router = express.Router();
const { Genre, validateGenre } = require('../model/genre');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
require('express-async-errors');
router.get('/', [auth], async (req, res, next) => {

    const genre = await Genre.find().sort('name');
    res.send(genre);

});
router.post('/', async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let genre = new Genre({
        name: req.body.name,
    })
    genre = await genre.save()
    res.send(genre);
});
router.put('/:id', async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name });
    if (!genre) return res.status(404).send("invalid genre ");
    genre = await genre.save()
    res.send(genre)
});
router.delete('/:id', [auth, admin], async (req, res, next) => {
    try {
        const genre = await Genre.findByIdAndDelete(req.params.id);
        if (!genre) return res.status(404).send("invalid genre ");
        res.send('done well, the genre was deleted successfully');
    } catch (err) {
        next(err)
    }
});
router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send("invalid genre");
    res.send(genre);
})
module.exports = router;