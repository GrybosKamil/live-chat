import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { setupSocket } from './socket';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"]
    }
  });

setupSocket(io);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});