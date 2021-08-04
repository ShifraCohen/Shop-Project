const Product = require('../models/product');
const Image = require('../models/image');
const Category = require('../models/category')
const imageController = require('./image');
var path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();
const relativePath = "../photos/";

const createCategory = async (req, res) => {
    let newCategory = new Category(req.body);
    try {
        await newCategory.save();
        console.log("saved");
        res.status(200).json({ newCategory: newCategory });
    }
    catch (error) {
        res.status(500).json({ 'Cannot save new category: ': error })
    }
}

const createProduct = async (req, res) => {
    let product = req.body;
    console.log(req.body);
    console.log(product);
    // let result = await imageController.createImage(image)
    // console.log(result);
    // if ((!result?.error) && result?.img) {
    try {
        let category = await Category.findOne({ name: product.category })
        // if(category)
        console.log(category);
        // product.category = category;
        // let newImage = new Image(result);
        let newProduct = new Product({
            name: product.productName,
            category,
            description: product.description,
            quentity: product.quentity,
            price: product.price,
            img: product.imgData
        });
        console.log(newProduct);
        // await newImage.save()
        // console.log(newImage);
        // newProduct.img = newImage;
        await newProduct.save();
        // console.log(newProduct);
        console.log("saved");
        res.status(200).json({ newProduct: newProduct });
    }
    catch (error) {
        console.log("can't save ", error);
        res.status(500).json({ 'Cannot save new product: ': error })
    }
    // }
    // else {
    //     res.status(500).json({ 'Cannot save new product: ': result.error })
    // }
}
const getProductById = async (req, res) => {
    try {
        let product = await Product.findById(req.params.productId).populate({ path: "img" });
        img = await fs.readFileSync(path.join(__dirname + "../../photos/" + product.img.name + ".jpg"));
        // console.log(product + "\n" + img);
        res.status(200).json({ product: product, img: img });
    }
    catch (error) {
        res.status(500).json({ 'cannot save new product: ': error.message })
    }
}

const getAllProducts = async (req, res) => {
    console.log('hi!');
    try {
        let products = await Product.find().populate({ path: "category" })
        // .populate({ path: "img" });
        // products.forEach((p) => {
        //     p.img.img.data = p.img.img.data.toString('base64')
        // })
        console.log('hello from get all products');
        console.log(products);
        res.status(200).json({ products: products })
    }
    catch (error) {
        console.log("my error  :  " + error);
        res.status(500).json({ error: error.toString() })
    }
}

const getProductsByCategoryId = async (req, res) => {
    console.log('hi!');
    try {
        
        let products = await Product.find({ category: req.params.categoryId }).populate({ path: "category" })
        console.log(products);
        // let products = await Product.find().populate({path:"category"})
        // .populate({ path: "img" });
        // products.forEach((p) => {
        //     p.img.img.data = p.img.img.data.toString('base64')
        // })
        console.log('hello from get all products');
        console.log(products);
        res.status(200).json({ products: products })
    }
    catch (error) {
        console.log("my error  :  " + error);
        res.status(500).json({ error: error.toString() })
    }
}
const getAllCategories = async (req, res) => {
    console.log('hi!');
    try {
        let categories = await Category.find()
        console.log('hello from get all categories');
        console.log(categories);
        res.status(200).json({ categories: categories })
    }
    catch (error) {
        console.log("my error  :  " + error);
        res.status(500).json({ error: error.toString() })
    }
}

const deleteProduct = async (req, res) => {
    console.log('delete Product');
    try {
        await User.findByIdAndDelete(req.params.productId)
        res.status(200).json({ "message": "Product has been deleted" });
    }

    catch (error) {
        res.status(500).json({ "error message": error.message });
    }
}

const updateProductQuentity = async (req, res) => {
    try {
        await Admin.findByIdAndUpdate(req.adminId, req.body)

        res.status(200).send("The admin has been updated")

    }
    catch (error) {
        res.status(500).json({ error: error })
    }
}

module.exports = { getProductsByCategoryId, getAllCategories, createCategory, getProductById, createProduct, getAllProducts, deleteProduct, updateProductQuentity }

