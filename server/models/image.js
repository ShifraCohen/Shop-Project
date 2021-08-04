const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
    name: {
        type: String
    },
    img:
    {
        path: String,
        data: Buffer,
        contentType: String,
    }
});



module.exports = mongoose.model('Image', imageSchema);
