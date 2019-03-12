$(function(){
    //make connection
    var socket = io.connect('http://localhost:3000/mainroom')

    var message = $("#message")
    var username = $("#username")
    var send_message = $("#send_message")
    var send_username = $("#send_username")
    var chatroom = $("#chatroom")


    
     //Emit message
     send_message.click(function(){    //button send_message is clicked and function fires
        
        socket.emit('new_message', {message : message.val()}) //emits new_message
    })

    //emit a username
    send_username.click(function(){
        
        socket.emit('change_username', {username : username.val()});
    })
  

    //listen on new message
    socket.on("new_message", (data) =>{    //listens for new_message
        console.log(data)
        chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>") //appends to chat whe3n new_message is heard
    })

   

    socket.on("main_welcome_message", (data) =>{    //listens for welcome
        console.log(data)
        chatroom.append("<p class='message'>" + "You have joined the Main room" + "</p>") // emits a message to current user when room is joined
    })

});