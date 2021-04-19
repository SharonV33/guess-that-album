
const socket = io()
const user = document.querySelector('#username')
const guess = document.querySelector('#guess')
const form = document.querySelector('form')
// const leaderboard = document.querySelector('#leaderboard')

form.addEventListener('submit', (event) => {
    event.preventDefault()
    if (guess.value && user.value) {
        socket.emit('message', {
            username: user.value,
            guess: guess.value,
            type: 'guess'
        })

        guess.value = ''
    }
})

socket.on('message', function(message) {
    switch (message.type){
        case 'updateLeaderboard':


            break;

        case 'albumGuessed':
            const leaderBoard = JSON.parse(message.leaderBoard)
            console.log('leaderboard', leaderBoard)
            const leaderboardItems = leaderBoard
                .map((item) => `<li>${item.name}: ${item.score}</li>`)
                .join('')

            document
                .querySelector('.leaderboard ol')
                .innerHTML = leaderboardItems
            // Set blur to false and show winner's name
            document
                .querySelector('#blurAlbum')
                .removeAttribute('checked')
            document
                .querySelector('.winner')
                .innerHTML = `congrats to ${message.winner} for guessing the album`
            break;

        case 'newAlbum':
            // Set blur to true
            // load new album art
            const newAlbum = JSON.parse(message.album)

            document
                .querySelector('#blurAlbum')
                .setAttribute('checked', 'checked')

            document
                .querySelector('#albumArtwork')
                .setAttribute('src', newAlbum.image[3]['#text'])

            document
                .querySelector('.winner')
                .innerHTML = ``

            break;
    }
})



