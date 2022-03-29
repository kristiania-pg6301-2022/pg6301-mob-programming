import express from "express";
import * as path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import fetch from "node-fetch";
import { WebSocketServer } from "ws";

dotenv.config();

const app = express();

const wsServer = new WebSocketServer({ noServer: true });

const sockets = [];
wsServer.on("connect", (socket) => {
  sockets.push(socket);
  socket.send(JSON.stringify({ author: "j", message: "h" }));
  socket.on("message", (msg) => {
    const { author, message } = JSON.parse(msg);
    for (const recipient of sockets) {
      socket.send(JSON.stringify({ author, message }));
    }
  });
});

app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(express.static("../client/dist"));
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.resolve("../client/dist/index.html"));
  } else {
    next();
  }
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Started on http://localhost:${server.address().port}`);
  server.on("upgrade", (req, socket, header) => {
    wsServer.handleUpgrade(req, socket, header, (socket) => {
      wsServer.emit("connect", socket, req);
    });
  });
});
