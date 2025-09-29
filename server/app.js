import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";

const port = 3000;
const app = express();
const server = createServer(app);

const io = new Server(server, {});

app.get("/", (req, res) => {
  res.send("Hello World");
});

io.on("connection", (socket) => {
  console.log("user connected");
  console.log("id", socket.id);
});

app.listen(port, () => {
  console.log(`Serving is running on port ${port}`);
});
