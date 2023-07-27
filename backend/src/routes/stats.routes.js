const router = require('express').Router()
const { authMiddleWare } = require('../utils/auth');
const User = require('../models/user')
const Detail = require('../models/detail')

router.get('/info', authMiddleWare, async (req, res) => {

    const user = await User.findOne({ username: req.username })

    if (!user) {
        return res.status(400).json({
            message: "User not found!"
        })
    }

    return res.status(200).json({
        username: user.username,
        email: user.email,
        createdAt: user.createdAt.getFullYear()
    })

})

router.get('/percentile', authMiddleWare, async (req, res) => {
    const currentUser = req.username;

    try {
        const currentUserDetail = await Detail.findOne({ username: currentUser });
        if (!currentUserDetail) {
            return res.status(400).json({
                message: "User not found!"
            });
        }

        const userAccountValue = currentUserDetail.accountValue;

        const usersWithHigherAccountValue = await Detail.find({
            accountValue: { $lte: userAccountValue }
        });

        const percentile = (usersWithHigherAccountValue.length / (await Detail.countDocuments())) * 100;

        return res.status(200).json({
            highestValue: currentUserDetail.accountValue,
            percentile: percentile.toFixed(2)
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});

module.exports = router