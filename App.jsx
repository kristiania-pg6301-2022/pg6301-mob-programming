import {useState} from "react";
import {randomQuestion} from "./questions-1"
import {isCorrectAnswer} from "./questions-1";

function ShowAnswer({question, onAnswer}){
    return <>
        <h1>{question.question}</h1>
        {Object.keys(question.answers)
            .filter(a => question.answers[a])
            .map(a => <p key={a}><button onClick={() => onAnswer(a)}>{question.answers[a]}</button></p>)}
    </>
}

function ShowStatus({answer, onRestart, question}) {
    return <>
    <h1>{isCorrectAnswer(question, answer) ? "Right" : "Wrong"}</h1>
        <p>
            <button onClick={onRestart}>Update question</button>
        </p>
    </>;
}


function App() {
    const [question, setQuestion] = useState(randomQuestion)
    const [answer, setAnswer] = useState()

    function handleRestart(){
        setQuestion(randomQuestion())
        setAnswer(undefined)
    }

    if (answer){
        return <ShowStatus question={question} answer={answer} onRestart={handleRestart}/>
    }
    return <ShowAnswer question={question} onAnswer={setAnswer}/>
  /*  return <div>
        <button onClick={generate}>Generate</button>
        {Questions.map(q =>
            <div key={q.id}>
                <h2>{q.question}</h2>

                <p>{q.answers.answer_a}</p>
                <button value={q.answers.answer_a} onClick={(e) => setAnswer(e.target.value)}>Answer a</button>

                <p>{q.answers.answer_b}</p>
                <button value={q.answers.answer_b} onClick={(e) => setAnswer(e.target.value)}>Answer b</button>

                <p>{q.answers.answer_c}</p>
                <button value={q.answers.answer_c} onClick={(e) => setAnswer(e.target.value)}>Answer c</button>

                <p>{q.answers.answer_d}</p>
                <button value={q.answers.answer_d} onClick={(e) => setAnswer(e.target.value)}>Answer d</button>

            </div> )}

    </div>;
*/
}

export default App;