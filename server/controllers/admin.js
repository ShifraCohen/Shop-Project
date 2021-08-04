// createAdmin, loginAdmin, deleteUser, updateAdmin
const Admin = require('../models/admin');
const sendMail = require('../routes/sendMail');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const createAdmin = async (req, res) => {
    let newAdmin = new Admin(req.body)

    console.log(newAdmin);
    try {
        await newAdmin.save();
        // sendMail.sendMailWhenCreateUser(req.body.email)

        res.status(200).json({ newAdmin: newAdmin });
    }
    catch (error) {
        res.status(500).json({ 'cannot save new admin: ': error.message })
    }
}
// const loginAdmin = async (req, res) => {
//     try {
//         console.log('loginAdmin');
//         let admin = await Admin.findOne({ name: req.params.adminName })

//         let token = jwt.sign(admin.name, process.env.TOKEN_SECRET);

//         console.log(token);
//         if (admin)
//             res.status(200).json({ admin: admin, token: token });
//         res.status(500).json({ massege: "Admin is null" })
//     }
//     catch (error) {
//         res.status(500).json({ error: error })
//     }
// }
// const updateAdmin = async (req, res) => {
//     try {
//         await Admin.findByIdAndUpdate(req.adminId, req.body)

//         res.status(200).send("The admin has been updated")

//     }
//     catch (error) {
//         res.status(500).json({ error: error })
//     }
// }


// const getAllUsers = async (req, res) => {
//     try {
//         console.log('hi');
//         let users = await User.find()
//         .populate({
//             path: 'weathers',
//             select: "city"
//             // { city: 1 }
//         })

//         console.log(users);
//         res.status(200).json({ users: users })
//     }
//     catch (error) {
//         res.status(500).json({ error: error })
//     }
// }


// const deleteUser = async (req, res) => {
//     console.log('delete user');
//     try {
//         await User.findByIdAndDelete(req.params.userId)
//         res.status(200).json({ "message": "User has been deleted" });
//     }

//     catch (error) {
//         res.status(500).json({ "error message": error.massage });
//     }
// }

// , loginAdmin, getAllUsers, deleteUser, updateAdmin
module.exports = { createAdmin }
