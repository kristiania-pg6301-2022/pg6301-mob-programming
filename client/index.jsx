import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { raw } from "concurrently/dist/src/defaults";

function FrontPage() {
  return (
    <div>
      <h1>FrontPage</h1>
      <div>
        <Link to={"/login"}>Log in</Link>
      </div>

      <div>
        <Link to={"/profile"}>Profile</Link>
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

    window.location.href =
      authorization_endpoint + "?" + new URLSearchParams(parameters);
  }, []);
  return (
    <div>
      <h1>Please wait....</h1>
    </div>
  );
}

function useLoader(loadingFn) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [error, setError] = useState();

  async function load() {
    try {
      setLoading(true);
      setData(await loadingFn);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => load(), []);

  return { loading, data, error };
}

function Profile() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [image, setImage] = useState();

  const { loading, data, error } = useLoader(async () => {
    return await fetchJSON("/api/login").then((json) => {
      setName(json.userinfo.name);
      setEmail(json.userinfo.email);
      setImage(json.userinfo.picture);
    });
  });

  if (loading) {
    return <div>Please wait...</div>;
  }

  if (error) {
    return <div>Error! {error.toString()}</div>;
  }

  return (
    <div>
      <h1>
        Profile for {name} with Email: ({email})
      </h1>
      <div>
        <img src={image} alt="picture" />
      </div>
    </div>
  );
}

function Callback() {
  const navigate = useNavigate();
  useEffect(async () => {
    const { access_token } = Object.fromEntries(
      new URLSearchParams(window.location.hash.substring(1))
    );
    console.log(access_token);

    await fetch("/api/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ access_token }),
    });
    navigate("/");
  });

  return (
    <div>
      <h1>Please wait...</h1>
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
