const express = require('express')
const app = express()
const http = require('http').createServer(app)
const path = require('path')
const compression = require('compression')
const io = require('socket.io')(http)
const port = process.env.PORT || 8080


app.use(express.static(path.resolve('public')))
app.use(compression())


io.on('connection', (socket) => {
    console.log('a user connected')

    socket.on('message', (message) => {
        // console.log('message: ' + message)
        io.emit('message', message)
    })

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
})

http.listen(port, () => {
    console.log('listening on port ', port)
})