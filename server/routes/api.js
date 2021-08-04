const router = require('express').Router();
const userMD = require('../middlewares/userMD');
const checkAdmin = require('../middlewares/checkAdminMD');
const user = require('../controllers/user');
const image = require('../controllers/image');
const product = require('../controllers/product');
const admin = require('../controllers/admin');
const multer = require('multer')
// let storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// });

// let upload = multer({ storage: storage });

// userMD.checkEmailInUse,
router.post('/registerUser', user.registerUser);
router.post('/loginUser', user.loginUser);
router.patch('/updateUser', userMD.verifyUser, user.updateUser);
// router.get('/getUserById', verifyMD.verifyUserName, user.getUserById);

// router.post('/addProductToCart', userMD.verifyUser, product.addProductToCart);
// router.delete('/deleteProductFromCart/:productCartId', userMD.verifyUser, product.deleteProductFromCart);
// router.patch('/updateProductQuentity', userMD.verifyUser, product.updateProductQuentity);

// router.post('/sendMail', user.sendMailFunc);
// // router.post('/uploadImg', upload.single('image'), image.uploadImg);
// router.get('/getAllImages', image.getAllImages);

//admin only!
router.post('/createAdmin', admin.createAdmin);
router.post('/createCategory', product.createCategory);
router.post('/createProduct', checkAdmin.checkAdmin, product.createProduct);
router.post('/addNewAddress', user.addNewAddress);
router.get('/getAllProducts', product.getAllProducts);
router.get('/getProductsByCategoryId/:categoryId', product.getProductsByCategoryId);
router.get('/getAllCategories', product.getAllCategories);
router.get('/getProductById/:productId', product.getProductById);


// ל admin:
// createAdmin, loginAdmin, deleteUser, updateAdmin
// ל user:

// createUser, loginUser, updateUser, getAllUsers, getUserById
// ל weather: 
// createWeather, deleteWeather, getWeathersByUserId, getWeather

module.exports = router;