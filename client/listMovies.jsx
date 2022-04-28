import { useLoader } from "./useLoader";
import React, { useContext } from "react";
import { MovieCard } from "./movieCard";
import { MovieApiContext } from "./movieApiContext";

export function ListMovies() {
  const { listMovies } = useContext(MovieApiContext);

  const { loading, error, data } = useLoader(async () => listMovies());

  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <div id={"error-msg"}>{error.toString()}</div>
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
