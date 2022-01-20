import ReactDOM from "react-dom"
import React, {useState} from "react";
import {BrowserRouter, Link, Routes, Route, useNavigate} from "react-router-dom";
import {isCorrectAnswer, randomQuestion} from "./questions-1";

function FrontPage() {
    return <div>
        <h1>Front-Page</h1>
        <Link to={"/Question"}>New Quiz</Link>
    </div>

}

function Quiz() {
    const navigate = useNavigate();

    const q  = randomQuestion();
    const answers = Object.keys(q.answers).filter( a => q.answers[a] );
    return <div>

        <h1>Questions</h1>
        <p>{q.question}</p>

        {answers.map( (answer)  =>{
            return <button key={answer} onClick={ () => {
                if(isCorrectAnswer(q,answer )){
                    navigate("/answer/right")
                } else{
                navigate("/answer/wrong")
              }
            }
            }>{q.answers[answer]}</button>
        })}
    </div>
}

function Answer() {
    return <div>
        <Routes>
                <Route path={"/wrong"} element={<h1>Wrong!!</h1>}></Route>
                <Route path={"/right"} element={<h1>Right!!</h1>}></Route>
        </Routes>
        <Link to={"/Question"}>
            Try another question
         </Link>
    </div>
}

function App() {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<FrontPage/>}></Route>
            <Route path={"/Question"} element={<Quiz/>}> </Route>
            <Route path={"/answer/*"} element={<Answer/>}></Route>
        </Routes>
    </BrowserRouter>
}

ReactDOM.render(<App/>, document.getElementById("App"))

