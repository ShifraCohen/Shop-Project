const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    description: {
        type: String
    },

    quentity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    img: {
        type: String,
    }
    // img: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Image'
    // }
})
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
module.exports = mongoose.model("Product", productSchema)