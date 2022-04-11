import { AddMovie } from "../addMovie";
import React from "react";
import ReactDOM from "react-dom";

describe("Add Movie Tests", () => {
  it("should show movie form", function () {
    const element = document.createElement("div");
    ReactDOM.render(<AddMovie />, element);
    expect(element.innerHTML).toMatchSnapshot();
    expect(
      Array.from(element.querySelectorAll("form label")).map((e) => e.innerHTML)
    ).toEqual(["Title", "Year", "Director", "Country", "Full plot"]);
  });
});
