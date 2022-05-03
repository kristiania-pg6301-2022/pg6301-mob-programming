import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { FrontPage } from "./pages/frontPage";
import React, { useContext } from "react";

import "./application.css";
import { LoginPage } from "./pages/loginPage";
import { LoginMoviesApiContext } from "./hooks&context/LoginMoviesApiContext";
import { useLoader } from "./hooks&context/useLoader";
import MovieLists from "./pages/movieLists";
import AddNewMovie from "./pages/addNewMovie";
import Profile from "./pages/profile";
import ChatPage from "./pages/chatPage";

function UserActions({ user }) {
  if (!user || Object.keys(user).length === 0) {
    return <Link to={"/login"}>Login</Link>;
  }

  return (
    <>
      <Link to={"/profile"}>
        {user.google?.name ? `Profile for ${user.google.name}` : ""}
        {user.microsoft?.name ? `Profile for ${user.microsoft.name}` : ""}
      </Link>
      <Link to={"/login/endsession"}>Log out</Link>
    </>
  );
}

export function App() {
  const provider = sessionStorage.getItem("provider");
  const { fetchLogin } = useContext(LoginMoviesApiContext);
  const { data, error, loading, reload } = useLoader(fetchLogin);

  if (error) {
    return <div>Error: {error.toString()}</div>;
  }
  if (loading) {
    return <div>Please wait...</div>;
  }

  return (
    <BrowserRouter>
      <header>
        <Link to={"/"}>Front page</Link>
        <Link to={"/movies"}>Movies</Link>
        <div className="menu-divider" />
        <UserActions user={data?.user} />
      </header>
      <main>
        <Routes>
          <Route
            path={"/"}
            element={<FrontPage user={data?.user[provider]} />}
          />
          <Route path={"/movies"} element={<MovieLists />} />
          <Route path={"/movies/new"} element={<AddNewMovie />} />
          <Route
            path={"/login/*"}
            element={<LoginPage config={data.config} reload={reload} />}
          />
          <Route
            path={"/profile"}
            element={<Profile user={data?.user[provider]} />}
          />
          <Route
            path={"/chat"}
            element={<ChatPage user={data?.user[provider]} />}
          />
          <Route path={"*"} element={<h1>Not found</h1>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
