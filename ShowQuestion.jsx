import {isCorrectAnswer, randomQuestion} from "./questions-1";
import {useContext, useState} from "react";
import {Link, Route, useNavigate} from "react-router-dom";

export const QuestionContext = React.createContext({randomQuestion})


export function FrontPage({correctAnswers, questionsAnswered}) {
    return <div>
        <h1>Quiz Øvingsoppgave 2</h1>
        <div data-testid={"status"}>You have answered {correctAnswers} of {questionsAnswered} correctly</div>

        <Link to={"/question"}>
            <button>Take a new quiz</button>
        </Link>
    </div>;
}

export function ShowQuestion({setCorrectAnswers, setQuestionsAnswered}) {

    function handleAnswer(answer) {
        setQuestionsAnswered(q => q + 1);
        if (isCorrectAnswer(question, answer)) {
            setCorrectAnswers(q => q + 1)
            navigate("/answer/correct");
        } else {
            navigate("/answer/wrong");
        }
    }

    const navigate = useNavigate();
    const {randomQuestion} = useContext(QuestionContext)
    const [question] = useState(randomQuestion())

    return <>
        <h1>{question.question}</h1>
        {Object.keys(question.answers)
            .filter(a => question.answers[a])
            .map(a => <p key={a} data-testid={a}>
                <button onClick={() => handleAnswer(a)}>{question.answers[a]}</button>
            </p>)}
    </>
    /*
        function handleRestart() {
            setQuestion(randomQuestion())
            setAnswer(undefined)
        }

        if (answer) {
            return <ShowStatus question={question} answer={answer} onRestart={handleRestart}/>
        }
        return <ShowAnswer question={question} onAnswer={setAnswer}/>
    }*/

}


export function Answer() {

    return (
        <div>
            <Routes>
                <Route path={"correct"} element={<h1>Correct!</h1>}/>
                <Route path={"wrong"} element={<h1>Wrong!</h1>}/>
            </Routes>
            <div><Link to={"/"}>Show score</Link></div>
            <div><Link to={"/question"}>New question</Link></div>

        </div>
    )
}