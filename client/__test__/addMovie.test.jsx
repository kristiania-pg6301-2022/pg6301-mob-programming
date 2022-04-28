import { AddMovie } from "../addMovie";
import React from "react";
import ReactDOM from "react-dom";
import { Simulate } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import { MovieApiContext } from "../movieApiContext";

describe("Add Movie Tests", () => {
  it("should show movie form", function () {
    const element = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter>
        <AddMovie />
      </MemoryRouter>,
      element
    );

    expect(element.innerHTML).toMatchSnapshot();
    expect(
      Array.from(element.querySelectorAll("form label")).map((e) => e.innerHTML)
    ).toEqual(["Title", "Year", "Director", "Country", "Full plot"]);
  });

  it("should add new movie on submit", function () {
    const addMovie = jest.fn();
    const title = "Test Movie";
    const year = "2019";
    const element = document.createElement("div");

    ReactDOM.render(
      <MemoryRouter>
        <MovieApiContext.Provider value={{ addMovie }}>
          <AddMovie />
        </MovieApiContext.Provider>
      </MemoryRouter>,
      element
    );

    Simulate.change(element.querySelector("form div:nth-of-type(2) input"), {
      target: { value: title },
    });

    Simulate.change(element.querySelector("form #yr"), {
      target: { year: year },
    });

    Simulate.submit(element.querySelector("form"));

    expect(addMovie).toBeCalledWith({
      title,
      year,
      director: "",
      country: "",
      fullplot: "",
    });
  });
});
