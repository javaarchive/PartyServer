import express from 'express'
const app = express()
const port = 3000;
import cors from "cors";
import path from 'path';
import http from 'http';

import { Server } from "socket.io";

const httpServer = http.createServer(app);
const io = new Server(httpServer);

app.use(cors());

// Render Html File
app.get('/', function(req, res) {
  res.sendFile(path.join(process.cwd(), 'templates/index.html'));
});

httpServer.listen(process.env.PORT, () => {
  console.log('listening on 0.0.0.0:' + process.env.PORT);
});

io.on("connection", (socket) => {
   socket.on("room_join", (roomID){
       if(roomID){
           socket.join(roomID);
       }
   }) 
});

console.log("Reached EOF");