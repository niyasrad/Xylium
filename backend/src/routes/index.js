const userRoutes = require('./user.routes')
const steamRoutes = require('./steam.routes')
const detailRoutes = require('./details.routes')
const statsRoutes = require('./stats.routes')
const settingsRoutes = require('./settings.routes')

const combineRoutes = (app) => {
    app.use('/api', userRoutes)
    app.use('/user', steamRoutes)
    app.use('/detail', detailRoutes)
    app.use('/stats', statsRoutes)
    app.use('/settings', settingsRoutes)
}

module.exports = combineRoutes