import React from "react";

export function MovieCard({
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