const jwt = require('jsonwebtoken')

const User = require('../models/user.model')


const protect = async (req, res, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('bearer')) {
        try {
            console.log("azert");
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_reset_pass)
            console.log("azer");
            req.header = await User.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            console.log(error);
            res.status(401).json()
        }
    }
    if (!token) {
        return res
            .status(401)
            .json({ msg: 'Token not not found or invalid! Access denied' })
    }
}

module.exports = protect