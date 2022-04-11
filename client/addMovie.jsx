import React, { useState } from "react";
import { FormInput } from "./FormInput";
import { FormText } from "./FormText";

export async function postJSON(url, body) {
  const res = await fetch(url, {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`${res.status}: ${res.statusText}`);
  }
}

export function AddMovie({ submitFn }) {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [director, setDirector] = useState("");
  const [fullplot, setFullplot] = useState("");
  const [country, setCountry] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    await submitFn({ title });
    await postJSON("/api/movies/new", {
      title,
      year: parseInt(year),
      directors: [director],
      fullplot,
      countries: [country],
    });
    setCountry("");
    setDirector("");
    setYear("");
    setFullplot("");
    setTitle("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add a new movie</h1>
      <FormInput label={"Title"} value={title} setValue={setTitle} />
      <FormInput label={"Year"} value={year} setValue={setYear} />
      <FormInput label={"Director"} value={director} setValue={setDirector} />
      <FormInput label={"Country"} value={country} setValue={setCountry} />
      <FormText label={"Full plot"} value={fullplot} setValue={setFullplot} />
      <button>Submit</button>
    </form>
  );
}
