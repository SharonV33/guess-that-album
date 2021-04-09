const express = require('express')
const app = express()

const http = require('http').createServer(app)
const io = require('socket.io')(http)
const fetch = require("node-fetch")

const compression = require('compression')

const port = process.env.PORT || 8080

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.static('public'))
app.use(compression())



app.get('/', async function(req, res) {
    const genre = "metalcore"
    const url = `https://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=${genre}&limit=100&api_key=b0cbd53d2ea5b525c2a0447aa31fcd10&format=json`
    const response = await fetch(url)
    const jsonResponse = await response.json()
    const data = jsonResponse.albums.album.filter((album) => album.mbid)

    const randomNumber = Math.floor(Math.random() * (data.length))
    console.log(randomNumber)
    const randomAlbum = data[randomNumber]


    res.render('pages/index.ejs', {
        albums: randomAlbum
    })
})


io.on('connection', (socket) => {
    console.log('a user connected')

    socket.on('answer', (answer) => {
        io.emit('answer',answer)
    })

    socket.on('message', (message) => {
        io.emit('message', message)
    })

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
})

http.listen(port, () => {
    console.log('listening on port ', port)
})