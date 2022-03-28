import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { useLoader } from "./useLoader";
import { FormInput } from "./FormInput";
import { FormText } from "./FormText";

function FrontPage() {
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

function MovieCard({
  movie: { title, year, fullplot, poster, countries, directors },
}) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{year}</p>
      {poster && <img src={poster} width={100} alt="poster" />}
      <p>{countries.join(", ")}</p>
      <div>{fullplot}</div>
      <h4>Directors: {directors.join(", ")}</h4>
    </div>
  );
}

function ListMovies() {
  const { loading, error, data } = useLoader(async () =>
    fetchJSON("/api/movies")
  );

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <div>{error.toString()}</div>
      </div>
    );
  }
  return (
    <div>
      <h1>List of Movies</h1>
      {data.map((movie) => (
        <MovieCard key={movie.title} movie={movie} />
      ))}
    </div>
  );
}

function Movies() {
  return (
    <Routes>
      <Route path={"/list"} element={<ListMovies />} />
      <Route path={"/addMovie"} element={<AddMovie />} />
    </Routes>
  );
}

function App() {
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
