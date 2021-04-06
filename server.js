const express = require('express')
const app = express()
const http = require('http').createServer(app)
const path = require('path')

app.use(express.static(path.resolve('public')))

app.get('/', (request, response) => {
    response.send('hoi')
})

http.listen(8080, () => {
    console.log('running on port 8080')
})