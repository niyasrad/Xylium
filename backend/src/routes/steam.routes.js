const router = require('express').Router();
const User = require('../models/user')
const authMiddleware = require('../utils/auth')

router.get('/person/:steamid?', authMiddleware, async (req, res) => {


    const user = await User.findOne({ username: req.username })
    if (!user) {
        return res.status(400).json({
            message: "User not found!"
        })
    }
    const steamid = req.params.steamid ? req.params.steamid : user.steamid;
    
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

router.get('/friends', authMiddleware, async (req, res) => {

    const user = await User.findOne({ username: req.username })

    if (!user) {
        return res.status(400).json({
            message: "User not found!"
        })
    }

    const steamid = user.steamid
    try {
        const result = await fetch("https://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=" + process.env.STEAM_KEY + "&steamid=" + steamid + "&relationship=friend")

        const friends = await result.json()

        if (!friends.friendslist || !friends.friendslist.friends) {
            return res.status(400).json({
                message: "Unable to retrieve friend list!"
            })
        }

        const filteredFriends = friends.friendslist.friends.slice(0, 3)
        return res.status(200).json(filteredFriends)
    
    } catch (err) {
        return res.status(400).json({
            message: "SteamID not found!"
        })
    }
})

router.get('/recent', authMiddleware, async (req, res) => {

    const user = await User.findOne({ username: req.username })

    if (!user) {
        return res.status(400).json({
            message: "User not found!"
        })
    }

    const steamid = user.steamid
    try {
        const result = await fetch("http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=" + process.env.STEAM_KEY + "&steamid=" + steamid)

        const games = await result.json()
        
        return res.status(200).json(games.response.games)
    
    } catch (err) {
        return res.status(400).json({
            message: "SteamID not found!"
        })
    }
})
module.exports = router