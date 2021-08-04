const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Enter a username.'],
        unique: [true, 'That username is taken.'],
        // lowercase: true,
        validate: [validator.isAlpha, 'Usernames may only have letters.']
    },
    password: {
        type: String,
        required: [true, 'Enter a password.'],
        minLength: [8, 'Password should be at least eight characters'],

    },
    email: {
        type: String,
        unique: [true, 'That email address is taken.'],
        lowercase: true,
        validate: [validator.isEmail, 'Enter a valid email address.']
    },
    addressList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    }],
    shoppingCart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ShoppingCart'
    }
    ,
    shoppingHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ShoppingCart'
        }
    ],
})

// userSchema.pre('save', async function(next) {
//     this.password = await bcrypt.hash(this.password, 12);
//     this.passwordConfirm = undefined;
//       next();
// });

// userSchema.pre("delete", async function (next) {
//     //מחיקת כל הקריאות המקושרות
//     console.log('predeleteuser');
//     await WeatherRequest.deleteMany({ user: this._id })
//     next()
// })

// companySchema.pre("delete", async function (next) {
//מחיקת כל המוצרים המקושרים
//     await Product.deleteMany({company:this._id})


// })
module.exports = mongoose.model("User", userSchema)



