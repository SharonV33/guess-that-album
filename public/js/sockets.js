
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
            const leaderBoard = JSON.parse(message.leaderBoard)
            document
                .querySelector('#leaderboard ul')
                .innerHTML = leaderBoard
                    .map((item) => `<li>${item.name}: ${item.score}</li>`)
                    .join('')

            break;

        case 'albumGuessed':
            console.log('correct guess made by ', message.winner)
            // Set blur to false and show winner's name
            document
                .querySelector('#blurAlbum')
                .removeAttribute('checked')
            break;

        case 'newAlbum':
            const newAlbum = JSON.parse(message.album)
            // Set blur to true
            // load new album art
            document
                .querySelector('#blurAlbum')
                .setAttribute('checked', 'checked')
            document
                .querySelector('#albumArtwork')
                .setAttribute('src', newAlbum.image[3]['#text'])
            break;
    }
})



