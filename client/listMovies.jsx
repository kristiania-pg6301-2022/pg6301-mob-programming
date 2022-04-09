import { useLoader } from "./useLoader";
import React from "react";
import { MovieCard } from "./movieCard";

export function ListMovies({ getMovies }) {
  const { loading, error, data } = useLoader(getMovies);

  if (loading) {
    return <div>Loading...</div>;
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
