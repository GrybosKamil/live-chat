import express from "express";
import http from "http";
import path from "path";
import { Server } from "socket.io";
import { setupSocket } from "./socket";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  path: "/api/socket",
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

setupSocket(io);

const PORT = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, "../../client/dist")));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
