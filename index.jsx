import ReactDOM from "react-dom"
import React, {useState} from "react";
import { BrowserRouter, Link, Routes, Route} from "react-router-dom";

function App() {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<h1>Front-Page</h1>}></Route>
            <Route path={"/Question"} element={<h1>Question</h1>}> </Route>
            <Route path={"/answer/*"} element={<h1>answer</h1>}></Route>
        </Routes>
    </BrowserRouter>
}

ReactDOM.render(<App/>, document.getElementById("App"))

