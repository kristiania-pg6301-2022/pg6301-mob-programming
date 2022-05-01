import randomString from "./randomString";
import { sha256 } from "./sha256";

export default function LoginButton({ config, provider, label }) {
  async function handleLogin() {
    const {
      authorization_endPoint,
      response_type,
      scope,
      client_id,
      code_challenge_method,
    } = config[provider];

    const state = randomString(50);
    window.sessionStorage.setItem("expected_state", state);

    const parameters = {
      response_type,
      response_mode: "fragment",
      client_id,
      state,
      scope,
      redirect_uri: `${window.location.origin}/login/${provider}/callback`,
    };

    if (code_challenge_method) {
      const code_verifier = randomString(50);
      window.sessionStorage.setItem("code_verifier", code_verifier);
      parameters.code_challenge_method = code_challenge_method;
      parameters.code_challenge = sha256(code_verifier);
    }

    window.location.href =
      authorization_endPoint + "?" + new URLSearchParams(parameters);
  }
  return (
    <div>
      <button onClick={handleLogin}>{label}</button>
    </div>
  );
}
