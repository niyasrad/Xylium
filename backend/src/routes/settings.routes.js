const router = require('express').Router()
const bcrypt = require('bcrypt')

const { authMiddleWare } = require('../utils/auth')
const User = require('../models/user')
const Detail = require('../models/detail')

router.post('/change', authMiddleWare, async (req, res) => {

    try {

        const userDocument = await User.findOne({ username: req.username })

        if (!userDocument) {
            return res.status(400).json({
                message: "User Not Found!"
            })
        }

        if (req.body.username) {
            return res.status(400).json({
                message: "You cannot change your username!"
            })
        }

        if (req.body.email) {

            const emailUserSearch = await User.findOne({ email: req.body.email })
            
            if (emailUserSearch) {
                return res.status(400).json({
                    message: "E-mail already registered!"
                })
            }

            userDocument.email = req.body.email
        }
        if (req.body.password) {

            const hashTest = await bcrypt.compare(req.body.password, userDocument.password)
            
            if (hashTest) {
                return res.status(400).json({
                    message: "Please enter a different password!"
                })
            }

            const passHash = await bcrypt.hash(req.body.password, 10)
            userDocument.password = passHash
            
        }

        await userDocument.save()

        return res.status(200).json({
            message: "Credentials Saved Successfully!"
        })

    } catch(err) {

        console.log(err)

        return res.status(500).json({
            message: "Something went wrong!"
        })

    }
    
})

router.post('/delete', authMiddleWare, async (req, res) => {

    const user = await User.findOne({ username: req.username })

    if (!user) {
        return res.status(400).json({
            message: "User not found!"
        })
    }

    try {

        User.deleteOne({ username: req.username })
        .then(() => {
            Detail.deleteOne({ username: req.username })
            .then(() => {
                return res.status(200).json({
                    message: "Account Deleted Successfully!"
                })
            })
            .catch((err) => {
                console.log(err)
                return res.status(400).json({
                    message: "Could not delete details!"
                })
            })
        })
        .catch((err) => {
            console.log(err)
            return res.status(400).json({
                message: "Could not delete user!"
            })
        })

    } catch(err) {

        console.log(err)

        return res.status(500).json({
            message: "Something went wrong!"
        })

    }
    

})


module.exports = router