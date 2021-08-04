const mongoose = require('mongoose');
const shoppingCartItemSchema = mongoose.Schema({

    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
   
    amount: { type: Number },

})


module.exports = mongoose.model("ShoppingCartItem", shoppingCartItemSchema)

