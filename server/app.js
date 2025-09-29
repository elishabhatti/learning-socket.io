import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";

const port = 3000;
const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

io.on("connection", (socket) => {
  console.log("user connected");
  console.log("id", socket.id);
  socket.emit("welcome", "Welcome to the server");
});

server.listen(port, () => {
  console.log(`Serving is running on port ${port}`);
});
