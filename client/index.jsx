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

function AddMovie() {
  return (
    <form onSubmit={handleSubmit}>
      <h1>Add a new movie</h1>
      {/* <div>
          Title:
          <input value={} onChange={}/>
        </div>
        <div>
          Year:
          <input value={} onChange={}/>
        </div>
        <div>
          Plot:
          <textarea value={} onChange={}/>
        </div>*/}
      <button>Submit</button>
    </form>
  );
}

function ListMovies() {
  const { loading, error, data } = useLoader(async () =>
    fetchJSON("api/movies")
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
        <div key={movie.title}>{movie.title}</div>
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
