const router = require('express').Router();
const { default: axios } = require('axios');
const User = require('../models/user')
const Detail = require('../models/detail')
const { authMiddleWare, userAttach } = require('../utils/auth');

router.get('/account/:username?', userAttach, async (req, res) => {

    const now = new Date();
    const hourAgo = new Date(now - 60 * 60 * 1000);
    
    const user = await User.findOne({ username: req.params.username ? req.params.username : req.username })

    if (!user) {
        return res.status(400).json({
            message: "User not found!"
        })
    }
    let detail = await Detail.findOne({ username: req.params.username ? req.params.username : req.username })
    if (detail) {
        if (detail.lastRequested && detail.lastRequested > hourAgo) {
            return res.status(200).json({
                value: detail.accountValue
            })
        }
    } else {
        detail = new Detail({
            username: req.username,
            accountValue: 0
        })
    }

    try {
        const result = await axios.get('http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=' + process.env.STEAM_KEY + '&steamid=' + user.steamid + '&format=json&include_appinfo=true')
        
        if (!result || !result.data || !result.data.response || !result.data.response.games) {
            return res.status(400).json({
                message: "Unable to retrieve games list!"
            })
        }

        const gameIds = result.data.response.games.map(game => game.appid);

        const gameDetailsResponse  = await axios.get(`https://store.steampowered.com/api/appdetails/?appids=${gameIds.join(',')}`+'&filters=price_overview&cc=us')
        const gameDetails = gameDetailsResponse.data;

        let totalValue = 0;
        Object.values(gameDetails).forEach(game => {
            if (game.data && game.data.price_overview) {
                totalValue += game.data.price_overview.final / 100;
            }
        });
        detail.accountValue = totalValue.toFixed(2)
        detail.lastRequested = Date.now()
        await detail.save()
        return res.status(200).json({
            value: totalValue.toFixed(2)
        })
    
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Internal server error!"
        })
    }
})


module.exports = router