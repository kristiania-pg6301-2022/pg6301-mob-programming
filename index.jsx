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

function Quiz( {setCorrectAnswers, setQuestionsAnswered}) {
    const navigate = useNavigate();

    const q  = randomQuestion();
    const answers = Object.keys(q.answers).filter( a => q.answers[a] );
    return <div>

        <h1>Questions</h1>
        <p>{q.question}</p>

        {answers.map( (answer)  =>{
            return <button key={answer} onClick={ () => {
                setQuestionsAnswered( v => v+1)
                if(isCorrectAnswer(q,answer )){
                    navigate("/answer/right")
                    setCorrectAnswers( v=> v+1)
                } else{
                navigate("/answer/wrong")
              }
            }
            }>{q.answers[answer]}</button>
        })}
    </div>
}

function Answer({ correctAnswers, questionsAnswered}) {
    return <div>
        <Routes>
                <Route path={"/wrong"} element={<h1>Wrong!!</h1>}></Route>
                <Route path={"/right"} element={<h1>Right!!</h1>}></Route>
        </Routes>
        <div>
            you have {correctAnswers} correct answers out of {questionsAnswered}
        </div>
        <Link to={"/Question"}>
            Try another question
         </Link>
    </div>
}

function App() {

    const [ questionsAnswered, setQuestionsAnswered] = useState(0);
    const [ correctAnswers, setCorrectAnswers] = useState(0);

    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<FrontPage/>}></Route>
            <Route path={"/Question"} element={<Quiz setQuestionsAnswered={setQuestionsAnswered} setCorrectAnswers={setCorrectAnswers}/>} > </Route>
            <Route path={"/answer/*"} element={<Answer questionsAnswered={questionsAnswered} correctAnswers={correctAnswers} />}></Route>
        </Routes>
    </BrowserRouter>
}

ReactDOM.render(<App/>, document.getElementById("App"))

