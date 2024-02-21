const socket = io();

document.getElementById("chatform").addEventListener("submit", (e)=>{
    e.preventDefault()
    const messageInput = document.getElementById("message")
    const message = messageInput.value;
    messageInput.value = "";

    socket.emit("chatMessage", message)
})

socket.on("message", async (data) =>{
    const chatMessages = document.getElementById("chat-messages")
    const messageElement = document.createElement("div")
    
    messageElement.innerHTML = `<stong>${data.user.username}:</strong> ${data.message}`
    
    chatMessages.appendChild(messageElement) 
})

document.getElementById("username-form").addEventListener("submit", (e) =>{
    e.preventDefault()
    const usernameInput = document.getElementById("username")
    const useremailInput = document.getElementById("useremail")
    const user = {
        username: usernameInput.value,
        email: useremailInput.value
    }

    socket.emit("newUser", user)

    document.getElementById("username-container").style.display = "none";
    document.getElementById("chat").style.display = "block"
})