const { Router } = require('express')
const Dev = require('./controllers/DevController')
const Search = require('./controllers/SearchController')

const routes = Router()

routes.get('/devs', Dev.index)
routes.post('/devs', Dev.store)

routes.get('/search', Search.index)

module.exports = routes
