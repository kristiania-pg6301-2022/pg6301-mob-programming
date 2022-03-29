import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
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

function ChatMsg({ msg: { author, message } }) {
  return (
    <div>
      <strong>{author}: </strong>
      {message}
    </div>
  );
}

function ChatApp({ username }) {
  const [ws, setWs] = useState();
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000");
    ws.onmessage = (e) => {
      const { author, message } = JSON.parse(e.data);
      setLog([...log, { author, message }]);
    };
    setWs(ws);
  }, []);
  const [log, setLog] = useState([
    {
      author: "j",
      message: "fgd",
    },
  ]);
  const [message, setMessage] = useState("");
  function handleMessage(e) {
    e.preventDefault();
    ws.send(JSON.stringify({ author: username, message }));
    setMessage("");
  }

  return (
    <div className={"app"}>
      <header>
        Chat exercise 8: <strong>{username}</strong>
      </header>
      <main>
        {log.map((msg, index) => (
          <ChatMsg key={index} msg={msg} />
        ))}
      </main>
      <footer>
        <form onSubmit={handleMessage}>
          <input value={message} onChange={(e) => setMessage(e.target.value)} />
          <button>Send</button>
        </form>
      </footer>
    </div>
  );
}

function App() {
  const [username, setUsername] = useState();

  if (!username) {
    return <Login onLogin={(user) => setUsername(user)} />;
  }

  return <ChatApp username={username} />;
}

ReactDOM.render(<App />, document.getElementById("app"));
