const userRoutes = require('./user.routes')
const steamRoutes = require('./steam.routes')
const detailRoutes = require('./details.routes')

const combineRoutes = (app) => {
    app.use('/api', userRoutes)
    app.use('/user', steamRoutes)
    app.use('/detail', detailRoutes)
}

module.exports = combineRoutes