const router = require('express').Router();
const User = require('../models/user')

router.get('/:username', async (req, res) => {

    const username = req.params.username;

    const user = await User.findOne({ username })
    if (!user) {
        return res.status(400).json({
            message: "User not found!"
        })
    }

    const steamid = user.steamid

    try {
        const result = await fetch("https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key="+ process.env.STEAM_KEY +"&steamids=" + steamid)

        const data = await result.json()

        if (data.response.players.length > 0) {
            return res.status(200).json(data.response.players[0])
        } else {
            return res.status(400).json({
                message: "SteamID not found!"
            })
        }
    
    } catch (err) {
        return res.status(400).json({
            message: "SteamID not found!"
        })
    }
    
})

module.exports = router