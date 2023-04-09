const router = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrpyt = require('bcrypt')
const User = require('../models/user')
const authMiddleWare = require('../utils/auth')


router.post('/signup', async (req, res) => {

    let user = await User.findOne({ $or: [{ steamid: req.body.steamid }, { username: req.body.username }]})

    if (user) {
        return res.status(400).json({
            message: "The E-mail/SteamID has already been registered!"
        })
    }
    

    const hash = await bcrpyt.hash(req.body.password, 10)

    try {
        const user = new User({
            username: req.body.username, 
            password: hash,
            steamid: req.body.steamid
        })
    
        await user.save()

        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '16h' })
    
        return res.status(200).json({
            username: user.username,
            accessToken: token
        })
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong, Try again!"
        })
    }

    

})

router.post('/signin', async (req, res) => {

    const user = await User.findOne({ $or: [ { username: req.body.username }, { steamid: req.body.username }] })
    
    if (!user) {
        return res.status(400).json({
            message: "Please check your credentials!"
        })
    }
    
    const match = await bcrpyt.compare(req.body.password, user.password)
    
    if (!match) {
        return res.status(400).json({
            message: "Please check your credentials!"
        })
    }

    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '16h' })

    return res.status(200).json({
        username: user.username,
        accessToken: token
    })
})

router.get('/test', authMiddleWare, (req, res) => {
    res.status(200).json({
        message: "Yes, you are authenticated."
    })
})

module.exports = router