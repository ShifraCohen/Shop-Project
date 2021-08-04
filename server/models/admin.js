const mongoose = require('mongoose');
const validator = require('validator');

const adminSchema = mongoose.Schema({
    adminName: {
        type: String,
        required: [true, 'Enter a username.'],
        unique: [true, 'That username is taken.'],
        // lowercase: true,
        validate: [validator.isAlpha, 'Usernames may only have letters.']
    },
    email: {
        type: String,
        // unique: [true, 'That email address is taken.'],
        lowercase: true,
        validate: [validator.isEmail, 'Enter a valid email address.']
    },
    password: {
        type: String,
        required: [true, 'Enter a password.'],
        minLength: [9, 'Password should be at least nine characters'],

    },
    
})

module.exports = mongoose.model("Admin", adminSchema)



