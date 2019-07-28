const jwt = require('jsonwebtoken');

module.exports = isAuth = (req, res, next) => {
    const token = req.header('x-access-token')

    if (!token) {
        return res.status(401).json({
            msg: 'Authorization Denied'
        })
    }

    try {
        const tokenContent = jwt.verify(token, process.env.TOKENSEC)
        req.userId = tokenContent.userId

        next();
    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg: 'Token is not valid'
        });
    }
}