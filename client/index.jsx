import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { ListMovies } from "./listMovies";
import { AddMovie } from "./addMovie";
import { fetchJSON } from "./HTTPcalls";

export function FrontPage() {
  return (
    <div>
      <h1>Movie Database 7</h1>
      <div>
        <Link to={"/movies/list"}>List Movies</Link>
      </div>

      <div>
        <Link to={"/movies/addMovie"}>Add a new movie</Link>
      </div>
    </div>
  );
}

export function Movies() {
  async function getMovies() {
    return await fetchJSON("/api/movies");
  }

  return (
    <Routes>
      <Route path={"/list"} element={<ListMovies getMovies={getMovies} />} />
      <Route path={"/addMovie"} element={<AddMovie />} />
    </Routes>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<FrontPage />} />
        <Route path={"/movies/*"} element={<Movies />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
