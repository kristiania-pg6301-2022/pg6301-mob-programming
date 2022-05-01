import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import React, { useContext } from "react";

import FrontPage from "./pages/frontPage";
import ChatPage from "./pages/chatPage";
import Profile from "./pages/profile";
import MovieLists from "./pages/movieLists";
import AddNewMovie from "./pages/addNewMovie";
import Login from "./pages/login";
import { DBLoginAPIContext } from "./hooks&context/DB&LoginAPIContext";
import { useLoader } from "./hooks&context/useLoader";

export function App() {
  const { fetchLogin } = useContext(DBLoginAPIContext);
  const { data, error, loading, reload } = useLoader(fetchLogin);
  console.log(data);

  if (error) {
    return <div>Error: {error.toString()}</div>;
  }

  if (loading) {
    return <div>Please wait...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<FrontPage />} />
        <Route
          path={"/login/*"}
          element={<Login config={data.config} reload={reload} />}
        />
        <Route path={"/profile"} element={<Profile user={data?.user} />} />
        <Route path={"/chat"} element={<ChatPage />} />
        <Route path={"/movies/"} element={<MovieLists />} />
        <Route path={"/movies/add"} element={<AddNewMovie />} />
        <Route path={"*"} element={<h1>Not found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
