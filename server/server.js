import express from "express";
import * as path from "path";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import bodyparser from "body-parser";
import cookieParser from "cookie-parser";
import loginApi from "./loginApi.js";

dotenv.config();

const app = express();
app.use(bodyparser.json());

app.use(cookieParser(process.env.COOKIE_SECRET));

app.use("/api/login", loginApi());
app.use(express.static("../client/dist/"));

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
