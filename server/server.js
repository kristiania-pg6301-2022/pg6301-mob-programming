import express from "express";
import * as path from "path";
import { MongoClient } from "mongodb";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import bodyparser from "body-parser";
import cookieParser from "cookie-parser";
import { LoginApi } from "./loginApi.js";
import { MoviesApi } from "./moviesApi.js";
import { WebSocketServer } from "ws";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(bodyparser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

const sockets = [];
const wsServer = new WebSocketServer({ noServer: true });
wsServer.on("connection", (socket) => {
  sockets.push(socket);

  socket.on("message", (message) => {
    console.log("Message: " + message);
    for (const recipient of sockets) {
      recipient.send(message.toString());
    }
  });
});

const mongoClient = new MongoClient(process.env.MONGODB_URL);
mongoClient.connect().then(async () => {
  console.log("Connected to mongodb");
  app.use(
    "/api/movies",
    MoviesApi(mongoClient.db(process.env.ATLAS_DATABASE || "pg6301"))
  );
});

app.use("/api/login", LoginApi());
app.use(express.static(path.resolve(__dirname, "..", "client", "dist")));

app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.resolve("../client/dist/index.html"));
  } else {
    next();
  }
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Started on http://localhost:${server.address().port}`);
  server.on("upgrade", (req, socket, head) => {
    wsServer.handleUpgrade(req, socket, head, (socket) => {
      console.log("Connected");
      wsServer.emit("connection", socket, req);
    });
  });
});
