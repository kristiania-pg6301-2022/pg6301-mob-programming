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
wsServer.on("connect", (socket) => {
  socket.send(JSON.stringify({ author: "j", message: "h" }));
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
