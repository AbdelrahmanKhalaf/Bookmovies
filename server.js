const db = require('mongoose');
var bodyParser = require('body-parser');
var express = require('express');
const customers = require('./router/customar');
const genres = require('./router/genre');
const movies = require('./router/movie');
const rentals = require('./router/rental');
const users = require('./router/user');
const auth = require('./router/auth');
const logger = require('morgan');
const config = require('config');
const cors = require('cors');
const errors = require('./middleware/error');
const winston = require('winston');
const app = express();
require('winston-mongodb');
db.connect('mongodb://localhost/alqaqaa',{ useUnifiedTopology: true })
.then(()=>console.log('connected to mongoDB...'))
.catch(()=>console.log('Could not connect to mongoDB...'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
//error when not found a set privet key
if(!config.get('jwtPrivatKey')) {
    console.log('FALAT ERROR : Privat Key Not Set ');
    process.exit(1);  
};
//error When a problem occurs in the API  catch  the exception error request in my project by plane
winston.add(winston.transports.File,{filename:'logFile.log'})
winston.add(winston.transports.MongoDB , {
    db : 'mongodb://localhost/alqaqaa',
    level : 'info'
});
// this is wrong in run time
// process.on('uncaughtException',(ex)=>{
//     console.log('somthin is wrong');
//     winston.error(ex.message,ex);
// });
winston.handleExceptions(new winston.transports.File({filename:"uncaughtException.log"}))
// this is error retuen from rejection my porject unhandelRejection 
// process.on('unhandledRejection',(unExRe)=>{
//     // console.log('handell rowng');
//     // winston.error(unExRe.message , unExRe);
//     throw unExRe
// })
//  throw new Error('som thing fale');
// const proms = Promise.reject(new Error('wwwwwwwwroeng'));
// proms.then(()=>console.log("oky")
// );

app.use(logger('dev'));
app.use("/uploads" , express.static('uploads'));
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies' , movies);
app.use('/api/rentals' , rentals);
app.use('/api/users' , users);
app.use('/api/auth' , auth);
app.use(errors);
PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`Listing on port ${PORT}....`));
