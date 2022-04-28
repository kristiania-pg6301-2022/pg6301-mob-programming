import ReactDOM from "react-dom";
import React from "react";

import { ListMovies } from "../listMovies";
import { act } from "react-dom/test-utils";
import { MovieApiContext } from "../movieApiContext";

async function listMovieRender(listMovies) {
  const element = document.createElement("div");
  await act(async () => {
    ReactDOM.render(
      <MovieApiContext.Provider value={{ listMovies }}>
        <ListMovies />
      </MovieApiContext.Provider>,
      element
    );
  });
  return element;
}

describe("ListMovies test", () => {
  it("should show loading", async function () {
    const dom = await listMovieRender(() => new Promise(() => {}));
    expect(dom.innerHTML).toMatchSnapshot();
  });

  it("should show loaded movies", async function () {
    const movies = [
      { title: "film 1", countries: ["Norway"], directors: ["Bob"] },
      { title: "film 2", countries: ["Norway"], directors: ["Bob"] },
    ];
    const dom = await listMovieRender(async () => movies);
    expect(
      Array.from(dom.querySelectorAll("h3")).map((e) => e.innerHTML)
    ).toEqual(["film 1", "film 2"]);
    expect(dom.innerHTML).toMatchSnapshot();
  });

  it("should show error", async function () {
    const dom = await listMovieRender(async () => {
      throw new Error("Failed to fetch");
    });
    expect(dom.querySelector("#error-msg").innerHTML).toEqual(
      "Error: Failed to fetch"
    );
    expect(dom.innerHTML).toMatchSnapshot();
  });
});
