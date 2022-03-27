import express from "express";
import * as path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { MoviesApi } from "./moviesApi.js";
import { MongoClient } from "mongodb";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

const client = new MongoClient(process.env.ATLAS_URL);
client.connect().then(async () => {
  app.use(
    "/api/movies",
    MoviesApi(client.db(process.env.ATLAS_DATABASE || "test"))
  );
});

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
});
