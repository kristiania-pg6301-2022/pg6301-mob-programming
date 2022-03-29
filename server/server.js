import express from "express";
import * as path from "path";
import bodyParser from "body-parser";
import { WebSocketServer } from "ws";

const app = express();

app.use(express.static("../client/dist"));

const sockets = [];
const wsServer = new WebSocketServer({ noServer: true });

wsServer.on("connect", (socket) => {
  sockets.push(socket);
  socket.on("message", (msg) => {
    for (const recipient of sockets) {
      recipient.send(msg.toString());
    }
  });
});

app.use(bodyParser.json());
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
