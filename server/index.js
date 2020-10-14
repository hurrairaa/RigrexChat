const express = require('express');
const next = require('next');
const http = require('http');
const socketio= require('socket.io');
const cookieParser = require("cookie-parser");
const connection= require('./model/DBconnection');



const dev=process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 3000;


const app= next({dir: '.',dev});
const handle = app.getRequestHandler();





app.prepare().then(()=>{
    const server= express();
    
    const serverIO=http.createServer(server);
    const io= socketio(serverIO)
    // io.on('connection',socket=>{
    //     console.log("Socket is working ...........................");
    //     socket.emit('message','welcome to chatCord');
    // });
    const Socket=require('./services/socketio');
    const socketOBj =new Socket(io);

    const routes=require('./router');
    const logger=require('./middleware/logger');

    server.use(express.urlencoded({extended: false}));
    server.use(express.json());
    server.use(logger);
    server.use(cookieParser());
    server.use ("/api",routes);
    
    
    server.get('*', (req, res) => {
        return handle(req, res)
    });
    
    
    

    serverIO.listen(PORT,(error)=>{
        if(error) throw error;
        console.log(`server is running on the port ${PORT}`)
    });
});



