import {useEffect, useState} from "react";
import {randomQuestion} from "./questions-1"
import {Questions} from "./questions-1";
import {isCorrectAnswer} from "./questions-1";

function App() {
    function generate(e) {
        e.preventDefault();
        setQuestion(randomQuestion);
        console.log(question)
        console.log(answer)
    }
    function answerF(e) {
        console.log(answer)
    }
    const [question, setQuestion] = useState()
    const [answer, setAnswer] = useState()

    return <div>
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

}

export default App;