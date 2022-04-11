import { AddMovie } from "../addMovie";
import React from "react";
import ReactDOM from "react-dom";
import { Simulate } from "react-dom/test-utils";

describe("Add Movie Tests", () => {
  it("should show movie form", function () {
    const element = document.createElement("div");
    ReactDOM.render(<AddMovie />, element);
    expect(element.innerHTML).toMatchSnapshot();
    expect(
      Array.from(element.querySelectorAll("form label")).map((e) => e.innerHTML)
    ).toEqual(["Title", "Year", "Director", "Country", "Full plot"]);
  });

  it("should add new movie on submit", function () {
    const handleSubmit = jest.fn();
    const title = "Test Movie";
    const element = document.createElement("div");

    ReactDOM.render(<AddMovie submitFn={handleSubmit} />, element);

    Simulate.change(element.querySelector("form input:nth-of-type(1)"), {
      target: { value: title },
    });
    Simulate.submit(element.querySelector("form"));

    expect(handleSubmit).toBeCalledWith({ title });
  });
});
