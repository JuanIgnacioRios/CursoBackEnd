const socket = io();
console.log("jhkdahskj")

document.getElementById("chatform").addEventListener("submit", (e) => {
    e.preventDefault()
    const messageInput = document.getElementById("message")
    const message = messageInput.value;
    messageInput.value = "";

    socket.emit("chatMessage", message)
})

socket.on("message", (data) => {
    const chatMessages = document.getElementById("chat-messages")
    const messageElement = document.createElement("div")
    console.log(data)
    messageElement.innerHTML = `<stong>${data.username}:</strong> ${data.message}`
    chatMessages.appendChild(messageElement)
})

document.getElementById("username-form").addEventListener("submit", (e) => {
    e.preventDefault()
    const usernameInput = document.getElementById("username")
    const username = usernameInput.value

    console.log("landinf", username)
    socket.emit("newUser", username)

    document.getElementById("username-container").style.display = "none";
    document.getElementById("chat").style.display = "block"
})