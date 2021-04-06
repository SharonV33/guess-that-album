const socket = io()
const messages = document.querySelector('section ul')
const message = document.querySelector('#message')
const user = document.querySelector('#username')

document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault()
    if (message.value && user.value) {
        socket.emit('message', {"username": user.value, "message": message.value})
        input.value = ''
    }
})

socket.on('message', function(message) {
    const element = document.createElement('li')
    console.log(message)
    element.textContent = `${message.username}: ${message.message}`
    messages.appendChild(element)
    messages.scrollTop = messages.scrollHeight
})

