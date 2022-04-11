import React from "react";

export function FormInput({ label, value, setValue }) {
  return (
    <div>
      <div>
        <label>{label}</label>
      </div>
      <div>
        <input value={value} onChange={(e) => setValue(e.target.value)} />
      </div>
    </div>
  );
}
