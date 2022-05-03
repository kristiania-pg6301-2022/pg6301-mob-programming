import { Link } from "react-router-dom";
import React from "react";

export function FrontPage({ user }) {
  return (
    <div>
      <h1>Movie Database</h1>
      <ul>
        <li>
          <Link to={"/movies"}>List movies</Link>
        </li>
        <li>
          <Link to={"/movies/new"}>Add new movie</Link>
        </li>
        {user ? (
          <li>
            <Link to={"/chat"}>Chat</Link>
          </li>
        ) : (
          <div></div>
        )}
      </ul>
    </div>
  );
}
