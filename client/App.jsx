import { BrowserRouter, Route, Routes } from "react-router-dom";
import FrontPage from "./pages/frontPage";
import ChatPage from "./pages/chatPage";
import Profile from "./pages/profile";
import MovieLists from "./pages/movieLists";
import AddNewMovie from "./pages/addNewMovie";
import Login from "./pages/login";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route to={"/"} element={<FrontPage />} />
          <Route to={"/login"} element={<Login />} />
          <Route to={"/profile"} element={<Profile />} />
          <Route to={"/chat"} element={<ChatPage />} />
          <Route to={"/movies/"} element={<MovieLists />} />
          <Route to={"/movies/add"} element={<AddNewMovie />} />
          <Route to={"*"} element={<h1>Not found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
