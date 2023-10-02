const express = require("express");
const app = express();
const server = require("http").createServer(app);
const WebSocket = require("ws");
const port = 8080;
const wss  = new WebSocket.Server({server:server});
const groups = {};
wss.on('connection', (socket) => {
    console.log('A new client Connected!');

    socket.on('message',(message)=>{
      try{
        const parsedMessage = JSON.parse(message);
        const group = parsedMessage.group;
        if(!groups[group]){
          groups[group] = [];
        } 
        groups[group].push(socket);

        groups[group].forEach((client)=>{
          if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
              }
        })
      } catch (error) {
        console.error('Invalid message:', message);
      }
      
      
    });
});
app.get('/',(req,res)=>res.send("Hello World"));

server.listen(port,()=>console.log("Listening on port"+port));