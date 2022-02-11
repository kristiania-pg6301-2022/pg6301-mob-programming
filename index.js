import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { isCorrectAnswer, Questions, randomQuestion } from "./questions.js";

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/question/random", (req, res) => {
  const { id, question, answers } = randomQuestion();

  res.send({ id, question, answers });
});

app.post("/question", (req, res) => {
  const { id, answer } = req.body;

  const question = Questions.find((q) => q.id === id);

  res.cookie("answered", (res.cookie.answered || 0) + 1);
  if (isCorrectAnswer(question, answer)) {
    res.cookie("correct", (res.cookie.correct || 0) + 1);
    res.send({ result: "correct" });
  } else {
    res.send({ result: "false" });
  }
});

app.get("/question/score", (req, res) => {
  const { answered, correct } = req.cookies;
  res.json({ answered, correct });
});

const server = app.listen(3000, () => {
  console.log(`Hello http://localhost:${server.address().port}`);
});
