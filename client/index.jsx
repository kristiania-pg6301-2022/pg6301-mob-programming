import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

function FrontPage() {
  return (
    <div>
      <h1>FrontPage</h1>
      <div>
        <Link to={"/login"}>Log in</Link>
      </div>

      <div>
        <Link to={"/profile"}>Profile</Link>
        <div>
          <a href={"/login/callback"}>sdsd</a>
        </div>
      </div>
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

function Login() {
  const [redirectURL, setRedirectURL] = useState();
  useEffect(async () => {
    const { authorization_endpoint } = await fetchJSON(
      "https://accounts.google.com/.well-known/openid-configuration"
    );

    const parameters = {
      response_type: "token",
      client_id:
        "134548719651-0n3bfj6iktgap06pmnfqj7gmvm849pm5.apps.googleusercontent.com",
      scope: "email profile",
      redirect_uri: window.location.origin + "/login/callback",
    };

    setRedirectURL(
      authorization_endpoint + "?" + new URLSearchParams(parameters)
    );
  }, []);
  return (
    <div>
      <a href={redirectURL}>Login</a>
    </div>
  );
}

function Profile() {
  return null;
}

function Callback() {
  return (
    <div>
      <h1>Callback</h1>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<FrontPage />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/login/callback"} element={<Callback />} />
        <Route path={"/profile"} element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
