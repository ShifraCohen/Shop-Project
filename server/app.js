const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const router = require('./routes/api');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const errorController = require('./controllers/errorController');

const app = express();
// const cryptoText=require('crypto').randomBytes(64).toString('hex')
// console.log(`The cryptoText is: ${cryptoText}`);
var cors = require('cors')
// app.use(errorController);
// app.use((err, req, res, next) => {
//     console.log('congrats you hit the error middleware');
//     console.log(err);
// })
// var multer = require('multer');
 
// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// });
 
// var upload = multer({ storage: storage });
app.use(cors())

const connectionParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}

mongoose.connect(process.env.DB_CONNECT, connectionParams)
    .then(() => {
        console.log('connected mongoDB');
    })
    .catch((err) => {
        console.log('error' + err);
    })

router.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use('/', router);
// app.set("view engine", "ejs");


app.listen(5000, () => {
    console.log("listening on port 5000");
})
