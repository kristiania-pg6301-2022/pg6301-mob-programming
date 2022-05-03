import React, { useContext, useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { LoginMoviesApiContext } from "../hooks&context/LoginMoviesApiContext";
import { LoginButton } from "../components/LoginButton";

export function LoginCallback({ reload, config }) {
  const { provider } = useParams();
  console.log(useParams());
  sessionStorage.setItem("provider", provider);

  const [error, setError] = useState();
  const navigate = useNavigate();
  const { registerLogin } = useContext(LoginMoviesApiContext);
  useEffect(async () => {
    const { access_token, error, error_description, state, code } =
      Object.fromEntries(
        new URLSearchParams(window.location.hash.substring(1))
      );

    const expected_state = window.sessionStorage.getItem("expected_state");
    if (!state || expected_state !== state) {
      setError("Unexpected state");
      return;
    }

    if (error || error_description) {
      setError(`Error: ${error} (${error_description})`);
      return;
    }

    if (code || provider === "microsoft") {
      const { client_id, token_endpoint } = config[provider];
      const code_verifier = window.sessionStorage.getItem("code_verifier");
      const payload = {
        grant_type: "authorization_code",
        code,
        client_id,
        code_verifier,
        redirect_uri: `${window.location.origin}/login/microsoft/callback`,
      };
      const res = await fetch(token_endpoint, {
        method: "POST",
        body: new URLSearchParams(payload),
      });
      if (!res.ok) {
        setError(`Failed to fetch token ${res.status}: ${await res.text()}`);
        return;
      }
      const { access_token } = await res.json();
      await registerLogin(provider, { access_token });
      reload();
      navigate("/");
      return;
    }

    if (!access_token) {
      setError("Missing access_token");
      return;
    }

    await registerLogin(provider, { access_token });
    reload();
    navigate("/");
  }, []);

  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <div>{error.toString()}</div>
        <div>
          <Link to={"/login/"}>Try again</Link>
        </div>
      </div>
    );
  }

  return <h1>Please wait...</h1>;
}

export function EndSession({ reload }) {
  const navigate = useNavigate();
  const { endSession } = useContext(LoginMoviesApiContext);
  useEffect(async () => {
    await endSession();
    reload();
    navigate("/");
  });
  return <h1>Please wait...</h1>;
}

function StartLogin({ config }) {
  return (
    <div>
      <h1>Login</h1>
      <LoginButton
        label={"Login with Google"}
        config={config}
        provider={"google"}
      />
      <LoginButton
        label={"Login with ID-porten"}
        config={config}
        provider={"microsoft"}
      />
    </div>
  );
}

export function LoginPage({ config, reload }) {
  return (
    <Routes>
      <Route path={"/"} element={<StartLogin config={config} />} />
      <Route
        path={"/:provider/callback"}
        element={<LoginCallback config={config} reload={reload} />}
      />
      <Route path={"/endsession"} element={<EndSession reload={reload} />} />
      <Route path={"*"} element={<StartLogin config={config} />} />
    </Routes>
  );
}
