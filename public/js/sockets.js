const socket = io()
const messages = document.querySelector('.messages')
const message = document.querySelector('#message')
const user = document.querySelector('#username')
// const answer = document.querySelector('#answer')

document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault()
    if (message.value && user.value) {
        socket.emit('message', {"username": user.value, "message": message.value})

        message.value = ''
        user.value = ''
    }
})



socket.on('message', function(message) {
    const element = document.createElement('li')
    const response = document.createElement('li')
    const userMessage = message.message.toLowerCase()
    element.innerHTML = `<span>${message.username}:</span> ${message.message}`
    messages.appendChild(element)

    if ( userMessage === 'hoi') {
        response.innerHTML = '<span>computer:</span> hallo'
        messages.appendChild(response)
    }
    if ( userMessage === 'vertel een grap') {
        response.innerHTML = '<span>computer:</span> jouw sociale leven tijdens corona'
        messages.appendChild(response)
    }
    if ( userMessage === 'heb je een handige link voor cmd?') {
        response.innerHTML = `<span>computer:</span> hva.nl/uitschrijven`
        messages.appendChild(response)
    }
    if ( userMessage === 'wat is het beste muziek genre?') {
        response.innerHTML = '<span>computer:</span> metalcore sowieso'
        messages.appendChild(response)
    }

    messages.scrollTop = messages.scrollHeight
})
