const proxy = require('http-proxy-middleware')

module.exports = function(app) {
    app.use(
        proxy('/api',{
            target: 'htpp://localhost:5000/'
        })
    )
}