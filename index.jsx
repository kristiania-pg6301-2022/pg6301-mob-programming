import React from "react"
import ReactDOM from "react-dom"
import {Routes, Route, Link, BrowserRouter} from "react-router-dom";


const movies = [
    {
        title: "The Matrix",
        plot: "Flying monkeys 90s SiFi shit",
        year: 1999
    },
    {
        title: "Harry Potter",
        plot: "Widard",
        year: 2001
    }

]


function FrontPage() {
    return <div>
        <h1>Kristiana movie database</h1>
        <ul>
            <li><Link to={"/movies"}>List movies</Link></li>
            <li><Link to={"/movies/new"}>New movie</Link></li>
        </ul>
    </div>
}

function ListMovies() {
    return <div><h1>List movies</h1>

            {movies.map(m =>
                <>
                <h2>{m.title} ({m.year})</h2>
                <div>{m.plot}</div>
                </>
            )}



    </div>;

}

function Application() {
    return <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<FrontPage/>}/>
            <Route path={"/movies/new"} element={<h1>New movie</h1>}/>
            <Route path={"/movies"} element={<ListMovies/>}/>
        </Routes>
    </BrowserRouter>
}

ReactDOM.render(<Application/>, document.getElementById("app"))