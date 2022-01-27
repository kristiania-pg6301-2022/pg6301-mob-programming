import * as React from "react";
import * as ReactDOM from 'react-dom';

function Question() {
    return <h1>Here is a question</h1>;
}

describe("Quiz Application", () => {
    it("shows quiz", () => {
        const element = document.createElement("div")
        ReactDOM.render(<Question />, element)
        expect(element.innerHTML).toMatchSnapshot()
    })
})