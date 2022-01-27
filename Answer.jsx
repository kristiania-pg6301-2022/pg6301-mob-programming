import {Link, Route, useNavigate} from "react-router-dom";
import {useContext} from "react";
import {isCorrectAnswer} from "./questions-1";

export default function Answer() {

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