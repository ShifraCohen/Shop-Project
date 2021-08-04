const User = require('../models/user');
const ShoppingCart = require('../models/shoppingCart')
const Admin = require('../models/admin')
const Address = require('../models/address')
const sendMail = require('../routes/sendMail');
const jwt = require('jsonwebtoken');
const errorController = require('./errorController')


const dotenv = require('dotenv');
dotenv.config();


const sendMailFunc = async (req, res) => {
    console.log("hi!");
    console.log(req.body.email);
    try {
        await sendMail.sendMailWhenCreateUser(req.body.email)
        res.status(200).json({ email: req.body.email, username: req.body.username, message: "email sent!" });

    }
    catch (error) {
        console.log("the error is here");
        res.status(500).json({ error: "User or password not correct!" })
    }

}
const registerUser = async (req, res) => {
    let newUser = new User(req.body)
    let newShoppingCart = new ShoppingCart();
    newUser.shoppingCart = newShoppingCart;


    console.log(newUser);
    try {
        await newUser.save();
        newShoppingCart.user = newUser;
        await newShoppingCart.save();
        console.log("saved");
        sendMail.sendMailWhenCreateUser(req.body.email)
        // let token = jwt.sign(newUser.email + ":" + newUser.password, process.env.TOKEN_SECRET);
        // console.log(token);
        // , token: token 
        res.status(200).json({ user: newUser });
    }
    catch (err) {
        errorController(err, res)
        console.log(err);
    }
}

const loginUser = async (req, res) => {
    try {
        // let token ;
        console.log("login!!");
        console.log(req.body);
        // let admin = await Admin.findOne({ email: req.body.email, password: req.body.password })
        // if(admin){
        //     token = jwt.sign(user.email + ":" + user.password, process.env.TOKEN_SECRET);

        // }
        let user = await User.findOne({ email: req.body.email, password: req.body.password })
            .populate({ path: "addressList" })
        let token = jwt.sign(user.email + ":" + user.password, process.env.TOKEN_SECRET);
        console.log(`user: ${user} 
        token: ${token}`);
        res.status(200).json({ user: user, token: token });

    }
    catch (error) {
        console.log("the error is here");
        res.status(500).json({ error: "User or password not correct!" })
    }
}

const updateUser = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.userId, req.body)

        res.status(200).send("the user has been updated")

    }
    catch (error) {
        res.status(500).json({ error: error })
    }
}

const addNewAddress = async (req, res) => {
    let address = req.body.address;
    console.log("req.body.address: " + req.body.address.fullName);
    try {
        let user = await User.findById(req.body.userId).populate({ path: "addressList" })
        let existAddress = user.addressList.filter((a) =>
            (a.fullName == address.fullName &&
                a.phone == address.phone &&
                a.country == address.country &&
                a.streetAddress == address.streetAddress &&
                a.city == address.city &&
                a.zipCode == address.zipCode))
        console.log("user.addressList" + user.addressList);
        console.log("existAddress" + existAddress)
        if (existAddress.length) {
            res.status(500).json({ error: "This address is already registered in your name" })
        }
        else {
            let newAddress = new Address(address);
            console.log(newAddress);
            await newAddress.save();
            user.addressList.push(newAddress);
            await user.save();
            console.log("saved");
            res.status(200).json({ newAddress: newAddress });
        }
    }
    catch (error) {
        console.log("can't save ", error);
        res.status(500).json({ error: 'Cannot save new address: ' + error })
    }
}
// const getUserById = async (req, res) => {
//     try {
//         console.log('hi');
//         let user = await User.findById(req.userId)
//             .populate({ path: "weathers", select: "city" })
//         console.log(user);
//         // .populate('weathers')
//         // console.log("getUser:"+user);
//         if (user)
//             return res.status(200).json({ user: user })
//         res.status(500).json({ message: "User is null" })
//     }
//     catch (error) {
//         res.status(500).json({ error: error })
//     }
// }

module.exports = { registerUser, loginUser, updateUser, addNewAddress, sendMailFunc }
// 0
// createUser, loginUser, updateUser, getAllUsers, getUserById