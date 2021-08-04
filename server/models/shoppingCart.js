const mongoose = require('mongoose');
const opts = {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
};
const shoppingCartSchema = mongoose.Schema({

    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],

}, opts)

shoppingCartSchema
    .virtual('totalPrice')
    .get(function () {
        if (this.products.length) {
            return this.products.reduce(function (currentValue, previousValue) {
                return (currentValue.price * currentValue.amount + previousValue.price * previousValue.amount);
            });
        }else{
            return 0;
        }

    });

shoppingCartSchema
    .virtual('status')
    .get(function () {
        if (!this.products.length) {
            return 'empty'
        }
        return 'In progress, unpaid'
    });
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
module.exports = mongoose.model("ShoppingCart", shoppingCartSchema)

