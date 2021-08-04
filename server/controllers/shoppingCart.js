const Product = require('../models/product');
const ShoppingCart = require('../models/shoppingCart');
const User = require('../models/user')
const productController = require('./product')

const addProductToCart = async (req, res) => {
    try {
        let { product } = req.body;
        let user = await User.findById(req.id)
        user.shoppingCart.products.push(product);
        
        res.status(200).json({ shoppingCart: user.shoppingCart });
    }
    catch (error) {
        res.status(500).json({ 'Cannot add product to cart: ': error })
    }
}







module.exports = { addProductToCart }

