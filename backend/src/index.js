require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const http = require('http')

const { setupWebsocket } = require('./websocket')
const routes = require('./routes')

const app = express()
const server = http.Server(app)

setupWebsocket(server)

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(cors())
app.use(express.json())
app.use(routes)

const port = process.env.PORT || 3333
server.listen(port, () => {
    console.log(`> Server listening on port ${port}`)
})
