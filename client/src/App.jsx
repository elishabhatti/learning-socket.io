import React, { useEffect } from "react";
import { io } from "socket.io-client";
import { Container, Typography } from "@mui/material";

const App = () => {
  const socket = io("http://localhost:3000");
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected", socket.id);
    });
    socket.on("welcome", (s) => {
      console.log(s);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Container maxWidth="sm">
      <Typography variant="h1" component="div" gutterBottom>
        Welcome to Socket.io
      </Typography>
    </Container>
  );
};

export default App;
