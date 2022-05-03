import React from "react";

export const LoginMoviesApiContext = React.createContext({
  async fetchLogin() {
    return await fetchJSON("/api/login");
  },
  async listMovies(query) {
    return await fetchJSON("/api/movies?" + new URLSearchParams(query));
  },
  async createMovie(movie) {
    return await postJSON("/api/movies", movie);
  },
  async registerLogin(provider, login) {
    return await postJSON(`/api/login/${provider}`, login);
  },
  async endSession() {
    const res = await fetch("/api/login", { method: "DELETE" });
    if (!res.ok) {
      throw new Error(`Failed to post ${res.status}: ${res.statusText}`);
    }
  },
  userinfo: undefined,
});

export async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to load ${res.status}: ${res.statusText}`);
  }
  return await res.json();
}
export async function postJSON(url, object) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(object),
  });
  if (!res.ok) {
    throw new Error(`Failed to post ${res.status}: ${res.statusText}`);
  }
}
