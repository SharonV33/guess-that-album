require('dotenv').config()
const express = require('express')
const app = express()

const http = require('http').createServer(app)
const io = require('socket.io')(http)
const fetch = require('node-fetch')
const LocalStorage = require('node-localstorage').LocalStorage

const compression = require('compression')

const port = process.env.PORT || 8080

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.static('public'))
app.use(compression())

localStorage = new LocalStorage('./localstorage')
/**
 * Select a random album from the top 50 metalcore albums from last.FM and
 * store it in local storage
 */
async function selectRandomAlbum () {
    const genre = 'metalcore'
    const url = `https://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=${genre}&limit=100&api_key=${process.env.API_KEY}&format=json`
    const response = await fetch(url)
    const jsonResponse = await response.json()
    const data = jsonResponse.albums.album.filter((album) => album.mbid)

    const randomNumber = Math.floor(Math.random() * (data.length))
    localStorage.setItem('currentAlbum', JSON.stringify(data[randomNumber]))
}

/**
 * Checks if the answer is right and adds score to the user if it is
 * @param name
 * @param guess
 */
async function checkAnswer (name, guess) {
    //get the data from the current album from localstorage
    const currentAlbum = JSON.parse(localStorage.getItem('currentAlbum'))

    //transform both values to lower case to prevent capital
    // letters from making an answer wrong
    if (guess.toLowerCase() === currentAlbum.name.toLowerCase()) {
        addScore(name)
        await selectRandomAlbum()
        return true
    } else {
        return false
    }
}

/**
 * Adds a +1 to the score of the given user
 * @param name
 * @returns {*|void}
 */
function addScore (name) {
    //get current leaderboard from localstorage
    const leaderBoard = JSON.parse(localStorage.getItem('leaderBoard'))
    //find the user who guessed the album correctly
    const user = leaderBoard.find((user) => user.name === name)

    //place all other users in a new array
    const otherUsers = leaderBoard.filter((user) => user.name !== name)
    //create a new array with all users from the leaderboard and add
    //+1 to the score of the user who guessed correct
    //'...' gets all objects from the array
    const newLeaderBoard = [...otherUsers, {
        name: name,
        score: user ? user.score + 1 : 1
    }]
    const sortedLeaderBoard = newLeaderBoard.sort((a, b) => b.score - a.score)
    //store new leaderboard in localstorage
    return localStorage.setItem('leaderBoard', JSON.stringify(newLeaderBoard))
}


app.get('/', async function(req, res) {
    const album = JSON.parse(localStorage.getItem('currentAlbum'))
    const leaderBoard = JSON.parse(localStorage.getItem('leaderBoard'))

    //if there is no album currently stored in localstorage,
    //fetch a new album and store it
    if (!album) {
        await selectRandomAlbum()
    }

    res.render('pages/index.ejs', {
        album: album,
        leaderBoard: leaderBoard
    })
})


io.on('connection', (socket) => {
    socket.on('message', async (message) => {
        switch (message.type) {
            case 'guess':
                const isCorrect = await checkAnswer(message.username, message.guess)

                if (isCorrect) {
                    io.emit('message', {
                        type: 'albumGuessed',
                        winner: message.username,
                        leaderBoard: localStorage.getItem('leaderBoard')
                    })
                    setTimeout(function () {
                        io.emit('message', {
                            type: 'newAlbum',
                            album: localStorage.getItem('currentAlbum')
                        })

                    }, 3000)
                }

                break;
        }
    })
})

http.listen(port, () => {
    console.log('listening on port ', port)
})