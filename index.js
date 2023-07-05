const express = require('express');
const http = require('http');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5001;
const Server = require("socket.io").Server

app.use(cors());

// socket server 
const server = http.createServer(app);
const io = new Server(server, {
     cors: {
          origin: "*",
          methods: ["GET", "POST"],
     }
});



io.on('connection', (socket) => {
     // console.log('A user connected');

     // Handle incoming messages
     socket.on('message', (data) => {
          // console.log('Received message:', data);
          io.emit('message', data); // Broadcast the message to all connected clients
     });

     // Handle disconnection
     socket.on('disconnect', () => {
          // console.log('A user disconnected');
     });
});
 


app.get('/', (req, res) => {
     res.send('Esomaz chat server is running');
   });
   

server.listen(port, () => console.log(`Esomaz Running on ${port} `))




// {
//      "src": "/socket.io/(.*)",
//      "dest": "socket.io",
//      "headers": {
//        "Access-Control-Allow-Origin": "*"
//      }
//    },