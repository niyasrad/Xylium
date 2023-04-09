const userRoutes = require('./user.routes')

const combineRoutes = (app) => {
    app.use('/api', userRoutes)
}

module.exports = combineRoutes