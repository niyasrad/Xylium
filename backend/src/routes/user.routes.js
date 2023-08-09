const router = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const { default: axios } = require('axios');
const { authMiddleWare } = require('../utils/auth')
const transporter = require('../configs/email.configs')


router.post('/signup', async (req, res) => {

    let user = await User.findOne({ $or: [{ steamid: req.body.steamid }, { username: req.body.username }, { email: req.body.email }]})

    if (user) {
        return res.status(400).json({
            message: "The Username/E-mail/SteamID has already been registered!"
        })
    }
    

    const hash = await bcrypt.hash(req.body.password, 10)

    try {
        const user = new User({
            username: req.body.username, 
            email: req.body.email,
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

    const user = await User.findOne({ $or: [ { username: req.body.username }, { steamid: req.body.username }, { email: req.body.username }] })
    
    if (!user) {
        return res.status(400).json({
            message: "Please check your credentials!"
        })
    }

    const match = await bcrypt.compare(req.body.password, user.password)
    
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

router.get('/checksteamauth', async (req, res) => {

    let steamExists = true;
    
    if (!req.query.steamid) {
        return res.status(400).json({
            message: "Enter a valid SteamID"
        })
    }

    await axios.get('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=' + process.env.STEAM_KEY + '&steamids=' + req.query.steamid)
    .then((res) => {
        if (!res.data || !res.data.response || !res.data.response.players || res.data.response.players.length === 0) {
            steamExists = false
        }
        
    })
    .catch((err) => {
        console.log(err)
        steamExists = false
    })

    if (steamExists) {
        return res.status(200).json({
            message: "SteamID is Valid"
        })
    } 

    return res.status(400).json({
        message: "This SteamID Does Not Exist!"
    })

})

router.get('/checkcreds', async (req, res) => {
    
    let userNameFind = await User.findOne({ username: req.query.username })

    if (userNameFind) {
        return res.status(400).json({
            message: "This Username is already taken!"
        })
    }   

    let userEmailFind = await User.findOne({ email: req.query.email })

    if (userEmailFind) {
        return res.status(400).json({
            message: "This E-mail is already registered!"
        })
    }

    return res.status(200).json({
        message: "Credential Check Success!"
    })

})

router.post('/forgotpassword', async (req, res) => {

    if (!req.body.email) {
        return res.status(400).json({
            message: "Please Enter an Email"
        })
    }    

    const userFind = await User.findOne({ email: req.body.email })
    if (!userFind) {
        return res.status(400).json({
            message: "Please enter a registered email!"
        })
    }

    const forgotToken = jwt.sign({ username: userFind.username }, process.env.JWT_SECRET, { expiresIn: '1h' })
    const mailOptions = {
        from: {
            name: "Xylium Gamezone",
            address: process.env.EMAIL
        },
        to: userFind.email,
        subject: 'Process - Resetting Password',
        text: `Please find the link to reset your password here, ${process.env.BASE_URL}/resetpassword/${forgotToken}`
    }

    try {

        await transporter.sendMail(mailOptions)
        return res.status(200).json({
            message: "Reset-Password E-mailed Successfully!"
        })

    } catch(err) {

        console.log(err)
        return res.status(500).json({
            message: "Something went wrong!"
        })
    
    }
    
})

router.post('/resetpassword', async (req, res) => {

    if (!req.body.logval || !req.body.password) {
        return res.status(400).json({
            message: "Please check the fields!"
        })
    }

    try {

        let decoded = jwt.verify(req.body.logval, process.env.JWT_SECRET)

        if (!decoded) {
            return res.status(400).json({
                message: "Invalid Request/Expired!"
            })
        }
        const user = await User.findOne({ username: decoded.username })

        if (!user) {
            return res.status(400).json({
                message: "Invalid ID!"
            })
        }

        const passHash = await bcrypt.hash(req.body.password, 10)
        user.password = passHash

        await user.save()

        return res.status(200).json({
            message: "Password Successfully Set!"
        })
            

    } catch (err) {

        console.log(err)
        return res.status(400).json({
            message: "Invalid Request/Expired!"
        })
        
    }

})

router.get('/checkauth', authMiddleWare, (req, res) => {
    res.status(200).json({
        message: req.username
    })
})

module.exports = router