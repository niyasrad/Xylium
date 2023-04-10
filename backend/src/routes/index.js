const userRoutes = require('./user.routes')
const steamRoutes = require('./steam.routes')

const combineRoutes = (app) => {
    app.use('/api', userRoutes)
    app.use('/user', steamRoutes)
}

module.exports = combineRoutes