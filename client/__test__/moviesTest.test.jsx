import ReactDOM from "react-dom";
import React from "react";

import { ListMovies } from "../listMovies";
import { act } from "react-dom/test-utils";

describe("ListMovies test", () => {
  it("should show loading", function () {
    const dom = document.createElement("div");
    ReactDOM.render(<ListMovies />, dom);
    expect(dom.innerHTML).toMatchSnapshot();
  });

  it("should show loaded movies", async function () {
    const movies = [
      { title: "film 1", countries: ["Norway"], directors: ["Bob"] },
      { title: "film 2", countries: ["Norway"], directors: ["Bob"] },
    ];
    const dom = document.createElement("div");
    await act(async () => {
      ReactDOM.render(<ListMovies getMovies={() => movies} />, dom);
    });
    expect(
      Array.from(dom.querySelectorAll("h3")).map((e) => e.innerHTML)
    ).toEqual(["film 1", "film 2"]);
  });
});
