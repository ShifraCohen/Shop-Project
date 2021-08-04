const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const Admin = require('../models/admin');

const checkAdmin = async (req, res, next) => {
//     console.log('checkAdmin');
// console.log(req.headers);
    let decodedEmailAndPassword = jwt.verify(req.headers.authorization, process.env.TOKEN_SECRET);
    console.log(decodedEmailAndPassword);
    let [email, password] = decodedEmailAndPassword.split(":")
    try {
        let admin = await Admin.findOne({ email: email, password: password })
        // console.log(admin);
        if (admin) {
            // req.adminId = admin._id;
            return next()
        }
        res.status(500).json({
            message: `Sorry, you do not have permission to perform this operation 
                      No admin with this name found`})
    }
    catch (error) {
        res.status(500).json({ error: error })
    }


}

module.exports = { checkAdmin }