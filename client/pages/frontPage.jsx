import React from "react";
import { Link } from "react-router-dom";

export default function FrontPage() {
  return (
    <div>
      <h1>Welcome to the list of movies</h1>
      <h2>To add a new movie or join the chat, you have to login</h2>
      <ul>
        <li>
          <Link to={"/movies"}>List movies</Link>
        </li>
        <li>
          <Link to={"/login"}>Login</Link>
        </li>
      </ul>
    </div>
  );
}
