import {Link} from "react-router-dom";

export function FrontPage({correctAnswers, questionsAnswered}) {
    return <div>
            <h1>Quiz Øvingsoppgave 2</h1>
        <div data-testid={"status"}>You have answered {correctAnswers} of {questionsAnswered} correctly</div>

            <Link to={"/question"}>
                <button>Take a new quiz</button>
            </Link>
        </div>;
}