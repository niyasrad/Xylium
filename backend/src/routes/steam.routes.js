const router = require('express').Router();
const { default: axios } = require('axios');
const User = require('../models/user')
const { authMiddleWare, userAttach } = require('../utils/auth');


// Endpoint used to get profile data using steamID or the person themselves
router.get('/person/:method/:steamid?', userAttach, async (req, res) => {

    const user = await User.findOne({ username: req.params.method === "username" ? req.params.steamid : req.username })
    if (!user) {
        return res.status(400).json({
            message: "User not found!"
        })
    }
    const steamid = req.params.method === "steamid" ? req.params.steamid : user.steamid;
    
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

router.get('/friends', authMiddleWare, async (req, res) => {

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

// Endpoint used to get recent played by username or by themselves
router.get('/recent/:username?', userAttach, async (req, res) => {

    const user = await User.findOne({ username: req.params.username ? req.params.username : req.username })

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
        let total2weekplay = 0
        for (let game of games.response.games) {
            total2weekplay += game.playtime_2weeks;
        }

        return res.status(200).json({games: games.response.games, total2weekplay: total2weekplay})
    
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Internal server error!"
        })
    }
})
module.exports = router