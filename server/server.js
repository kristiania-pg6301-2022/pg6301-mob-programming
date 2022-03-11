import express from "express";
import * as path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

async function fetchJSON(url, options){
    const res = await fetch(url, options)
    if (!res.ok){
        throw new Error(`Failed ${res.status}`)
    }
    return await res.json()
}




app.use(express.static("../client/dist"));
app.use((req, res, next) => {
    if (req.method === "GET" && !req.path.startsWith("/api")) {
        res.sendFile(path.resolve("..client/dist/index.html"))
    }else {
        next();
    }
})

const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Started on http://localhost:${server.address().port}`);
});