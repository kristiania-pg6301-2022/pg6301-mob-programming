import { useContext, useState } from "react";
import { LoginMoviesApiContext } from "../hooks&context/LoginMoviesApiContext";
import { useNavigate } from "react-router-dom";

function FormInput({ value, label, onChangeValue }) {
  return (
    <div>
      <label>
        <strong>{label}</strong>
        <input value={value} onChange={(e) => onChangeValue(e.target.value)} />
      </label>
    </div>
  );
}
export default function AddNewMovie() {
  const { createMovie } = useContext(LoginMoviesApiContext);
  const navigate = useNavigate();
  function handleSubmit(event) {
    event.preventDefault();
    const year = parseInt(yearInput);
    createMovie({ title, year, country, plot });
    navigate("/");
  }

  const [title, setTitle] = useState("");
  const [yearInput, setYearInput] = useState("");
  const [country, setCountry] = useState("");
  const [plot, setPlot] = useState("");
  return (
    <form onSubmit={handleSubmit}>
      <h1>Add a new movie</h1>
      <FormInput label={"Title: "} value={title} onChangeValue={setTitle} />
      <FormInput label="Year:" value={yearInput} onChangeValue={setYearInput} />
      <FormInput label="Country:" value={country} onChangeValue={setCountry} />
      <FormInput label="Plot:" value={plot} onChangeValue={setPlot} />
      <button>Save</button>
    </form>
  );
}
