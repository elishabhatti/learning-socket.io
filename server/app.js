import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import jwt from "jsonwebtoken";

const port = 3000;
const app = express();
const server = createServer(app);
const secretKey = "secetkey1234";

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

app.get("/login", (req, res) => {
  const token = jwt.sign({ _id: "elishajameelid", secretKey });
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
});

const user = false;

io.use((socket, next) => {
  if (user) next();
});

io.on("connection", (socket) => {
  console.log("user connected", socket.id);
  socket.on("message", ({ message, room }) => {
    console.log({ message, room });
    socket.to(room).emit("receive-message", message);
  });

  socket.on("join-room", (room) => {
    socket.join(room);
    console.log(`User Joined Room ${room}`);
  });
  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(port, () => {
  console.log(`Serving is running on port ${port}`);
});
