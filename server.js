const express = require('express')
const app = express()
const db = require('./db')
require('dotenv').config()
const bodyparser = require('body-parser')
app.use(bodyparser.json())
const passport = require('./auth')
const menurouter = require('./routes/menuroute')
const personrouter = require('./routes/personroute')
app.use(passport.initialize())
app.get('/', function (req, res) {
    res.send('Hello this is response')
})

app.use('/person', personrouter)
app.use('/menu', menurouter)
port = process.env.port || 3000
app.listen(port, () => {
    console.log('listening to port number ', port)
})