import express from 'express'
import bodyParser from "body-parser";
import {randomQuestion} from "./questions.js";

const app = express();
app.use(bodyParser.json())

const server = app.listen(3000, () => {
    console.log(`Hello http://localhost:${server.address().port}`)
})

app.get("/question/random", (req, res) => {
    const { id, question, answers} = randomQuestion()

    res.send({id, question, answers});
})

app.post("/question", (req, res) => {

})