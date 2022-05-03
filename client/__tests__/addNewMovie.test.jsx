import { act, Simulate } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import AddNewMovie from "../pages/addNewMovie";
import ReactDOM from "react-dom";
import React from "react";
import { LoginMoviesApiContext } from "../hooks&context/LoginMoviesApiContext";

describe("add movie", () => {
  it("should show from", async () => {
    const element = document.createElement("div");
    await act(async () =>
      ReactDOM.render(
        <MemoryRouter>
          <AddNewMovie />
        </MemoryRouter>,
        element
      )
    );
    expect(element.innerHTML).toMatchSnapshot();

    const inputLabels = Array.from(
      element.querySelectorAll("form label strong")
    ).map((label) => label.innerHTML);
    expect(inputLabels).toEqual(["Title: ", "Year:", "Country:", "Plot:"]);
  });

  it("should submit form", async () => {
    const createMovie = jest.fn();

    const element = document.createElement("div");
    await act(async () =>
      ReactDOM.render(
        <MemoryRouter>
          <LoginMoviesApiContext.Provider value={{ createMovie }}>
            <AddNewMovie />
          </LoginMoviesApiContext.Provider>
        </MemoryRouter>,
        element
      )
    );
    Simulate.change(element.querySelector("form div:nth-of-type(1) input"), {
      target: { value: "Movie Title" },
    });
    Simulate.change(element.querySelector("form div:nth-of-type(2) input"), {
      target: { value: "2022" },
    });
    Simulate.submit(element.querySelector("form"));

    expect(createMovie).toBeCalledWith({
      title: "Movie Title",
      year: 2022,
      plot: "",
      country: "",
    });
  });
});
