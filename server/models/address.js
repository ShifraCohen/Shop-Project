const mongoose = require('mongoose');
const addressSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
    },
    country:{
        type: String,
        required: true,
    },
    streetAddress: {
        type: String,
        required: true,
    },
    city:{
        type: String,
        required: true,
    },
    zipCode:{
        type: Number,
        required: true,
    }
})

module.exports = mongoose.model("Address", addressSchema)