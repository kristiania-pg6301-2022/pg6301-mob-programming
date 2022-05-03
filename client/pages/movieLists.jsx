import React, { useContext, useState } from "react";
import { LoginMoviesApiContext } from "../hooks&context/LoginMoviesApiContext";
import { useLoader } from "../hooks&context/useLoader";

function MovieCard({ movie: { title, plot, poster } }) {
  return (
    <>
      <h3>{title}</h3>
      {poster && <img src={poster} width={100} alt={"Movie poster"} />}
      <div>{plot}</div>
    </>
  );
}

export default function MovieLists() {
  const { listMovies } = useContext(LoginMoviesApiContext);
  const [country, setCountry] = useState("");
  const [countryInput, setCountryInput] = useState("");
  const { loading, error, data } = useLoader(
    async () => listMovies({ country }),
    [country]
  );

  function handleSubmitQuery(e) {
    e.preventDefault();
    setCountry(countryInput);
  }
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
      <h1>Movies from mFlix</h1>

      <div>
        <form onSubmit={handleSubmitQuery}>
          <label>
            Country:
            <input
              id="country-query"
              value={countryInput}
              onChange={(e) => setCountryInput(e.target.value)}
            />
            <button>Filter</button>
          </label>
        </form>
      </div>

      {data.map((movie) => (
        <MovieCard key={movie.title} movie={movie} />
      ))}
    </div>
  );
}
