import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

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
  const token = jwt.sign({ _id: "elishajameelid" }, secretKey);
  res
    .cookie("token", token, { httpOnly: false, secure: true, sameSite: "none" })
    .json({ message: "login Success" });
});

const user = false;

io.use((socket, next) => {
  cookieParser()(socket.request, socket.request.res, (err) => {
    if (err) return next(err);
    const token = socket.request.cookies.token;
    if (!token) return next(new Error("Authentication Error"));
    const decoded = jwt.verify(token, secretKey);
    if (!decoded) return next(new Error("Authentication Error"));
  });
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
