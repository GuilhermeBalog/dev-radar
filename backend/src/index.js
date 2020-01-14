const express = require('express')
const mongoose = require('mongoose')
const { atlas } = require('./credentials')
const routes = require('./routes')

const app = express()

mongoose.connect(`mongodb+srv://${atlas.username}:${atlas.password}@cluster0-dm80i.mongodb.net/${atlas.database}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(express.json())
app.use(routes)

const port = process.env.PORT || 3333
app.listen(port, () => {
    console.log(`> Server listening on port ${port}`)
})