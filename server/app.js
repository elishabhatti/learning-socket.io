import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";

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
  console.log("user connected", socket.id);
  socket.on("message", (data) => {
    console.log(data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
  
});

server.listen(port, () => {
  console.log(`Serving is running on port ${port}`);
});
