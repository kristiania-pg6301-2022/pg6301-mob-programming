import React, { useContext, useState } from "react";
import { FormInput } from "./FormInput";
import { FormText } from "./FormText";
import { postJSON } from "./HTTPcalls";
import { useNavigate } from "react-router-dom";
import { MovieApiContext } from "./movieApiContext";

export function AddMovie() {
  const { addMovie } = useContext(MovieApiContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [yearIn, setYearIn] = useState("");
  const [director, setDirector] = useState("");
  const [fullplot, setFullplot] = useState("");
  const [country, setCountry] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const year = parseInt(yearIn);
    await addMovie({ title, year, director, country, fullplot });
    /* await submitFn({ title });
       await postJSON("/api/movies/new", {
         title,
         year: parseInt(year),
         directors: [director],
         fullplot,
         countries: [country],
       });*/
    navigate("/");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add a new movie</h1>
      <FormInput label={"Title"} value={title} setValue={setTitle} />
      <FormInput id={"yr"} label={"Year"} value={yearIn} setValue={setYearIn} />
      <FormInput label={"Director"} value={director} setValue={setDirector} />
      <FormInput label={"Country"} value={country} setValue={setCountry} />
      <FormText label={"Full plot"} value={fullplot} setValue={setFullplot} />
      <button>Submit</button>
    </form>
  );
}
