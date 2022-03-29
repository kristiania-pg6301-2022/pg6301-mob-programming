import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { raw } from "concurrently/dist/src/defaults";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(username);
  }

  return (
    <div>
      <h1>Log in to chat</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:{" "}
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <button>Login</button>
      </form>
    </div>
  );
}

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed ${res.status}`);
  }
  return await res.json();
}

function App() {
  const [username, setUsername] = useState();

  if (!username) {
    return <Login onLogin={(user) => setUsername(user)} />;
  }

  return <div>Hello {username}</div>;
}

ReactDOM.render(<App />, document.getElementById("app"));
