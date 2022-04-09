import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { FormInput } from "./FormInput";
import { FormText } from "./FormText";
import { ListMovies } from "./listMovies";

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

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed ${res.status}: ${res.statusText}`);
  }
  return await res.json();
}

async function postJSON(url, body) {
  const res = await fetch(url, {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`${res.status}: ${res.statusText}`);
  }
}

function AddMovie() {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [director, setDirector] = useState("");
  const [fullplot, setFullplot] = useState("");
  const [country, setCountry] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    await postJSON("/api/movies/new", {
      title,
      year: parseInt(year),
      directors: [director],
      fullplot,
      countries: [country],
    });
    setCountry("");
    setDirector("");
    setYear("");
    setFullplot("");
    setTitle("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add a new movie</h1>
      <FormInput label={"Title"} value={title} setValue={setTitle} />
      <FormInput label={"Year"} value={year} setValue={setYear} />
      <FormInput label={"Director"} value={director} setValue={setDirector} />
      <FormInput label={"Country"} value={country} setValue={setCountry} />
      <FormText label={"Full plot"} value={fullplot} setValue={setFullplot} />
      <button>Submit</button>
    </form>
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
