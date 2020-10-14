const mongoose= require('mongoose');
const ChatModel=mongoose.model("Chat");

class Sockets{
    constructor(io){
        this.io=io;
        io.on('connection',socket=>{
            console.log("Socket is working ...........................");

            socket.emit('message','welcome to chatCord');
            
            socket.on('chatMessage',(msg)=>{
                this.storeChat(msg);
                socket.broadcast.emit('chatMessage',msg);
            })

            socket.on('joined',(user)=>{
                socket.broadcast.emit('joined',`${user.name} has joined the chat`);
            })
            
            socket.on('disconnect',()=>{
                socket.broadcast.emit('message','a user has left the chat');
            })
        });
    }
    storeChat(msg){
        ChatModel.create({
            name:msg.name,
            image:msg.image,
            msg:msg.msg,
            user_id:msg.user_id,
            time:msg.time
        });
    }


}

module.exports= Sockets;