const express = require('express')
const app = express()
const http = require('http').createServer(app)
const path = require('path')
const compression = require('compression')

const port = 8080

app.use(express.static(path.resolve('public')))
app.use(compression())

app.get('/', (request, response) => {
    response.send('hoi')
})

//the "process.env.PORT" is specific for Heroku deployment
http.listen(process.env.PORT || port, () => {
    console.log(`Server running at http://localhost:${port}/`)
})
