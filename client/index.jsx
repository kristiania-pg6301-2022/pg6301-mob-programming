import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";

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

        </div>);
}

async function fetchJSON(url, options){
    const res = await fetch(url, options)
    if (!res.ok){
        throw new Error(`Failed ${res.status}`)
    }
    return await res.json()
}

function Login() {
    return null;
}

function Profile() {
    return null;
}

function Callback() {
    return null;
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<FrontPage/>}/>
                <Route path={"/login"} element={<Login/>}/>
                <Route path={"/profile"} element={<Profile/>}/>
                <Route path={"/login/callback"} element={<Callback/>}/>
            </Routes>
        </BrowserRouter>);
}

ReactDOM.render(<App/>, document.getElementById("app"));
