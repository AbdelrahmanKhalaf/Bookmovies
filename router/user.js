var express = require('express');
var router = express.Router();
var multer = require('multer');
const _ = require('lodash');
const auth = require('../middleware/auth');
const { User, validateUser } = require('../model/user');
router.post('/', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('that user alryed registered');
    user = new User(_.pick(req.body, ['name', 'phone', 'email', 'actvition', 'avatar', 'password']))
    customar = await user.save()
    const token = user.generaToken()
    res.header('x-auth-token',token).send(_.pick(user, ['naem', 'id', 'email', 'phone', 'actvition']));

});
router.get('/me',auth, async (req,res)=>{
    const user  = await User.findById(req.user._id).select('-password');
    res.send(user);
})
/**{
        name : req.body.name,
        phone :req.body.phone,
        email:req.body.email,
        actvition:req.body.actvition,
        avatar:req.body.avatar,
        password : req.body.password,
    } */
module.exports = router;