const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const User = require('../models/user');





const verifyUser = async (req, res, next) => {
    console.log('verify');
    let decodedEmailAndPassword = jwt.verify(req.headers.authorization, process.env.TOKEN_SECRET);
    console.log(decodedEmailAndPassword);
    let [email, password] = decodedEmailAndPassword.split(":")
    try {
        let user = await User.findOne({ email: email, password: password })
        console.log(user);
        if (user) {
            req.userId = user._id;
            return next()

        }
        res.status(500).json({ message: "user is null" })
    }
    catch (error) {
        res.status(500).json({ error: error })
    }

}

module.exports = { verifyUser}