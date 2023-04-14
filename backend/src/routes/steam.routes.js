const router = require('express').Router();
const { default: axios } = require('axios');
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
        const result = await axios.get("https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key="+ process.env.STEAM_KEY +"&steamids=" + steamid)

        const data = await result.data

        if (result.status !== 200 || data.response.players.length === 0) {
            return res.status(400).json({
                message: "Unable to retrieve player data!"
            })
        }
        
        return res.status(200).json(data.response.players[0])
    
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Internal server error!"
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
        const result = await axios.get("https://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=" + process.env.STEAM_KEY + "&steamid=" + steamid + "&relationship=friend")

        const friends = result.data

        if (result.status !== 200 || !friends.friendslist || !friends.friendslist.friends) {
            return res.status(400).json({
                message: "Unable to retrieve friend list!"
            })
        }

        const filteredFriends = friends.friendslist.friends.slice(0, 3)
        return res.status(200).json(filteredFriends)
    
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Internal server error!"
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
        const result = await axios.get("http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=" + process.env.STEAM_KEY + "&steamid=" + steamid)

        const games = await result.data

        if (result.status !== 200 || !games.response || !games.response.games) {
            return res.status(400).json({
                message: "Unable to retrieve recently played games!"
            })
        }
        
        return res.status(200).json(games.response.games)
    
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Internal server error!"
        })
    }
})
module.exports = router