var express = require('express');
var router = express.Router();
var multer = require('multer');
const {Customar,validateCustomar} =  require('../model/customar') ;
router.get('/', async (req,res)=>{
    const customar = await Customar.find().sort('name');
    res.send(customar);
});
router.post('/', async (req,res)=>{
    const {error} = validateCustomar(req.body);
    if(error) return res.status(400).send(error.details[0].message) ;
    let customar = new Customar({
        name : req.body.name,
        phone :req.body.phone,
        email:req.body.email,
        actvition:req.body.actvition,
        avatar:req.body.avatar
    })
    customar = await customar.save()
    res.send(customar);
});
router.put('/:id', async (req,res)=>{
    const {error} = validateCustomar(req.body);
    if(error) return res.status(400).send(error.details[0].message) ;
    let customar = Customar.findByIdAndUpdate(req.body.id,{
        name : req.body.name,
        phone : req.body.phone,
        email : req.body.email,
    },{new:true});
    if(!customar) return res.status(404).send("The Customar with the Given ID was not found ");
    res.send(customar);
});
router.delete('/:id', async (req,res)=>{
    const {error} = validateCustomar(req.body);
    if(error) return res.status(400).send(error.details[0].message) ;
    const customar = await Customar.findByIdAndDelete(req.body.id);
    if(!customar) return res.status(404).send("The Customar with the Given ID was not found ");
    res.send('done well, The customer was deleted successfully');
});
router.get('/:id',async (req,res)=>{
    const {error} = validateCustomar(req.body);
    if(error) return res.status(400).send(error.details[0].message) ;
    const customar = await Customar.findById(req.body.id);
    if(!customar) return res.status(404).send("The Customar with the Given ID was not found ");
    res.send(customar);
})
module.exports = router;