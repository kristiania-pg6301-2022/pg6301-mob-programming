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

const ProfileContext = React.createContext({
  userinfo: undefined,
});

function FrontPage({ reload }) {
  const { userinfo } = useContext(ProfileContext);

  async function Logout() {
    await fetch("/api/login", { method: "delete" });
    reload();
  }
  return (
    <div>
      <h1>Front Page</h1>
      {!userinfo && (
        <div>
          <Link to={"/login"}>Log in</Link>
        </div>
      )}

      {userinfo && (
        <div>
          <Link to={"/profile"}>Profile for {userinfo.name}</Link>
        </div>
      )}
      {userinfo && (
        <div>
          <button onClick={Logout}>Log out</button>
        </div>
      )}
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
  const { oauth_config } = useContext(ProfileContext);
  useEffect(async () => {
    const { discovery_url, client_id, scope } = oauth_config;
    const document = await fetchJSON(discovery_url);
    const { authorization_endpoint } = document;

    const parameters = {
      response_type: "token",
      response_mode: "fragment",
      scope,
      client_id,
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
  const { userinfo } = useContext(ProfileContext);

  /*
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
*/

  return (
    <div>
      <h1>
        Profile for {userinfo.name} with Email: ({userinfo.email})
      </h1>
      <div>
        <img src={userinfo.picture} alt="picture" />
      </div>
    </div>
  );
}

function Callback({ reload }) {
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
    reload();
    navigate("/");
  });

  return (
    <div>
      <h1>Please wait...</h1>
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const [login, setLogin] = useState();
  useEffect(loadF, []);

  async function loadF() {
    setLoading(true);
    setLogin(await fetchJSON("/api/login"));
    setLoading(false);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ProfileContext.Provider value={login}>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<FrontPage reload={loadF} />} />
          <Route path={"/login"} element={<Login />} />
          <Route
            path={"/login/callback"}
            element={<Callback reload={loadF} />}
          />
          <Route path={"/profile"} element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </ProfileContext.Provider>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
