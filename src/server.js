const express = require("express");
const app = express();
const server = require("http").createServer(app);
const WebSocket = require("ws");
const port = 3000;
const wss  = new WebSocket.Server({server:server});
const groups = {};
wss.on('connection', (socket) => {
    console.log('A new client Connected!');

    socket.on('message',(message)=>{
      try{
        console.log(message);
        const parsedMessage = JSON.parse(message);
         
        const group = parsedMessage.group;

        if(!groups[group]){
          groups[group] = [];
        }
        console.log("b1");
        groups[group].push(socket);
        console.log("b2");
        groups[group].forEach((client)=>{
            console.log("b3");
          if (client !== ws && client.readyState === WebSocket.OPEN) {
                console.log("b4");
                client.send(message);
                console.log("b5");
              }
        })
      } catch (error) {
        console.error('Invalid message:', message);
      }
      
      
    });
});
app.get('/',(req,res)=>res.send("Hello World"));

server.listen(port,()=>console.log("Listening on port"+port));
