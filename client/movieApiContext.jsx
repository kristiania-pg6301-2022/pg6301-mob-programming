import React from "react";
import { fetchJSON, postJSON } from "./HTTPcalls";

export const MovieApiContext = React.createContext({
  async listMovies(country) {
    return fetchJSON(`/api/movies?country=${country}`);
  },
  async addMovie(movie) {
    await postJSON("/api/movies/new", movie);
  },
});
