import { Router } from "express";

const movieS = [
  {
    title: "Movie1",
  },
  {
    title: "Movie2",
  },
];

export function MoviesApi() {
  const Movies = new Router();

  Movies.get("/", (req, res) => {
    res.json(movieS);
  });

  Movies.post("/new", (req, res) => {
    res.sendStatus(500);
  });

  return Movies;
}
