import ReactDOM from "react-dom"
import React, {useState} from "react";
import { BrowserRouter, Link, Routes, Route} from "react-router-dom";
import{randomQuestion} from "./questions-1";

function FrontPage() {
    return <div>
        <h1>Front-Page</h1>
        <Link to={"/Question"}>New Quiz</Link>
    </div>

}

function Quiz() {


    const q  = randomQuestion();
    const answers = Object.keys(q.answers).filter( a => q.answers[a] );
    return <div>

        <h1>Questions</h1>
        <p>{q.question}</p>

        {answers.map( (propKey)  =>{
            return <button key={propKey}>{q.answers[propKey]}</button>
        })}
    </div>
}

function App() {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<FrontPage/>}></Route>
            <Route path={"/Question"} element={<Quiz/>}> </Route>
            <Route path={"/answer/*"} element={<h1>answer</h1>}></Route>
        </Routes>
    </BrowserRouter>
}

ReactDOM.render(<App/>, document.getElementById("App"))

