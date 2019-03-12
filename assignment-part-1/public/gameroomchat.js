$(function(){
    //make connection
    var gamesocket = io.connect('http://localhost:3000/games')
    var message = $("#game_message")
    var username = $("#username")
    var send_message = $("#send_game_message")
    var send_username = $("#send_game_username")
    var chatroom = $("#chatroom")

    //emit a username

    send_username.click(function(){
        console.log(username.val())
        gamesocket.emit('change_game_username', {username : username.val()})
    })

     //Emit message
     send_message.click(function(){    //button send_message is clicked and function fires
        
        gamesocket.emit('new_game_message', {message : message.val()}) //emits new_message
    })

    //listen on new message
    gamesocket.on("new_game_message", (data) =>{    //listens for new_message
        console.log(data)
        chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>") //appends to chat whe3n new_message is heard
    })

    gamesocket.on("game_welcome_message", (data) =>{    //listens for welcome
        console.log(data)
        chatroom.append("<p class='message'>" + "You have joined the Games room" + "</p>") // emits a message to current user when room is joined
    })
});