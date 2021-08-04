// const multer = require('multer');
const Image = require('../models/image');
var path = require('path');
const sharp = require('sharp');
const fs = require('fs');

const getAllImages = async (req, res) => {
    try {
        images = await Image.find()
        res.status(200).json({ images: images });

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'An error occurred' + err });
    }

}


const createImage = async (image) => {
    try {
        let imageInput = path.join(__dirname + "../../photos/" + image.name + ".jpg");
        let data = await sharp(imageInput).resize(870, 540).jpeg().toBuffer()
        data = data.toString('base64')
        let contentType = 'image/png'
        let newImage = new Image({
            name: image.name,
            description: image.description,
            img: {
                data,
                contentType,
            }
        });
        return newImage;
    }
    catch (error) {
        return error;
    }
}

// const uploadImg = async (req, res) => {
//     // console.log(req);
//     let obj = {
//         name: req.body.name,
//         description: req.body.description,
//         img: {
//             data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.body.imgFile)),
//             contentType: 'image/png'
//         }
//     }
//     let img = new Image(obj);

//     try {
//         // let img = await Image.create(obj)
//         await img.save()
//         res.status(200).json({ message: "uploaded" })
//     }
//     catch (err) {
//         res.status(500).json('An error occurred', err);

//     }
// }





// let storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// });
// upload.single('image')
// let upload = multer({ storage: storage });
module.exports = { createImage, getAllImages }
// uploadImg