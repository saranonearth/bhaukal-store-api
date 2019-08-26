const jwt = require('jsonwebtoken');
const User = require('../models/user');
module.exports = isAdmin = async (req, res, next) => {
    const token = req.header('x-access-token')

    if (!token) {
        return res.status(401).json({
            msg: 'Authorization Denied'
        })
    }

    try {
        const tokenContent = jwt.verify(token, process.env.TOKENSEC)


        const user = await User.findById(tokenContent.userId)

        if (user.email === process.env.ADMIN) {
            req.userId = tokenContent.userId
            next();
        } else {
            return res.status(401).json({
                msg: 'Not Authorized'
            })
        }
    } catch (error) {
        res.status(401).json({
            msg: 'Token is not valid'
        });
    }
}