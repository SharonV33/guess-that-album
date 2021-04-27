const socket = io()
const user = document.querySelector('#username')
const guess = document.querySelector('#guess')
const form = document.querySelector('form')

form.addEventListener('submit', (event) => {
    //prevent page from reloading
    event.preventDefault()
    if (guess.value && user.value) {
        socket.emit('message', {
            username: user.value,
            guess: guess.value,
            type: 'guess'
        })

        //clear guess input field
        guess.value = ''
    }
})

socket.on('message', function(message) {
    //check the type of message
    switch (message.type){
        case 'albumGuessed':
            //make li for each leaderboard entry
            const leaderBoard = JSON.parse(message.leaderBoard)
            const leaderboardItems = leaderBoard
                .map((item) => `<li>${item.name}: ${item.score}</li>`)
                .join('')

            //add leaderboard content to client
            document
                .querySelector('.leaderboard ol')
                .innerHTML = leaderboardItems
            //unblur album
            document
                .querySelector('#blurAlbum')
                .removeAttribute('checked')
            //show a message containing the winner's name
            document
                .querySelector('.winner')
                .innerHTML = `congrats to ${message.winner} for guessing the album`
            break;

        case 'newAlbum':
            const newAlbum = JSON.parse(message.album)

            // Set blur to true
            document
                .querySelector('#blurAlbum')
                .setAttribute('checked', 'checked')

            // load new album art
            document
                .querySelector('#albumArtwork')
                .setAttribute('src', newAlbum.image[3]['#text'])

            //clear winner message
            document
                .querySelector('.winner')
                .innerHTML = ``

            break;

        case 'error':
            if (message.username === user.value) {
                alert(message.message)
            }
            break;
    }
})



