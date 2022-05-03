import { act, Simulate } from "react-dom/test-utils";
import ReactDOM from "react-dom";
import { LoginMoviesApiContext } from "../hooks&context/LoginMoviesApiContext";
import MovieLists from "../pages/movieLists";
import React from "react";

const movies = [
  {
    title: "My movie",
    plot: "Something happens",
    poster: "https://example.com/poster1.jpg",
  },
  {
    title: "My other movie",
    plot: "Nothing happens",
    poster: "https://example.com/void1.jpg",
  },
];

async function renderListMovies(listMovies) {
  const element = document.createElement("div");
  await act(async () =>
    ReactDOM.render(
      <LoginMoviesApiContext.Provider value={{ listMovies }}>
        <MovieLists />
      </LoginMoviesApiContext.Provider>,
      element
    )
  );
  return element;
}

describe("list movies", () => {
  it("should show loading screen", async () => {
    const element = await renderListMovies(() => new Promise(() => {}));
    expect(element.querySelector(".loading-indicator")).not.toBeNull();
    expect(element.innerHTML).toMatchSnapshot();
  });

  it("should show queries by country", async () => {
    const listMovies = jest.fn(() => []);
    const element = document.createElement("div");
    await act(async () => {
      ReactDOM.render(
        <LoginMoviesApiContext.Provider value={{ listMovies }}>
          <MovieLists />
        </LoginMoviesApiContext.Provider>,
        element
      );
    });
    Simulate.change(element.querySelector("#country-query"), {
      target: { value: "Norway" },
    });
    await act(async () => {
      await Simulate.submit(element.querySelector("form"));
    });
    expect(listMovies).toHaveBeenCalledWith({
      country: "Norway",
    });
  });

  it("should movie list", async () => {
    const element = await renderListMovies(async () => movies);
    expect(element.querySelector("h3").innerHTML).toEqual(movies[0].title);
    expect(element.innerHTML).toMatchSnapshot();
  });

  it("should show error message", async () => {
    const element = await renderListMovies(async () => {
      throw new Error("Failed to fetch");
    });
    expect(element.querySelector(".error-message").innerHTML).toContain(
      "Failed to fetch"
    );
    expect(element.innerHTML).toMatchSnapshot();
  });
});
