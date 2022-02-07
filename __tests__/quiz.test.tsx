import * as React from "react";
import * as ReactDOM from "react-dom";
import { Question } from "../question";

describe("Quiz Application", () => {
  it("shows quiz", () => { const element = document.createElement("div")
    ReactDOM.render(<Question />, element)
    expect(element.innerHTML).toMatchSnapshot()
  });
});
