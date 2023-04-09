const jwt = require('jsonwebtoken')

const authMiddleWare = (req, res, next) => {
    if (!req.headers['authorization']) {
        return res.status(403).json({
            message: "You are not authenticated!"
        })
    }
    const token = req.headers['authorization'].split(' ')[1]
    if (!token) {
        res.status(403).json({
            message: "You are not authenticated!"
        })
    } 
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err || !decoded) return res.status(400).json({
            message: "Login has failed!"
        }) 
    })
    next()
}

module.exports = authMiddleWare