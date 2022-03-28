import { Router } from "express";

export function MoviesApi(atlasDatabase) {
  const Movies = new Router();

  Movies.get("/", async (req, res) => {
    const movieS = await atlasDatabase
      .collection("movies")
      .find({
        countries: {
          $in: ["Ukraine"],
        },
        year: {
          $gte: 1999,
        },
      })
      .sort({
        metacritic: -1,
      })
      .map(({ title, year, fullplot, poster, countries, directors }) => ({
        title,
        year,
        fullplot,
        poster,
        countries,
        directors,
      }))
      .limit(10)
      .toArray();
    res.json(movieS);
  });

  Movies.post("/new", (req, res) => {
    const { title, year, fullplot, poster, countries, directors } = req.body;
    atlasDatabase.collection("movies").insertOne({
      title,
      year,
      fullplot,
      poster,
      countries,
      directors,
    });
    res.sendStatus(200);
  });

  return Movies;
}
