// Contractor.jsx
import React, { useRef, useState } from "react";
import { firestore } from "../firebase";
import { addDoc, collection } from "@firebase/firestore";
import "./Contractor.css"; // Import external CSS file

const Contractor = () => {
  const [inputFields, setInputFields] = useState([
    { id: 1, label: "phonenumber", value: "" },
    { id: 2, label: "city", value: "" },
    { id: 3, label: "fullname", value: "" },
    { id: 4, label: "jobfield", value: "" },
  ]);

  const ref = collection(firestore, "Contractors");

  const handleSave = async (e) => {
    e.preventDefault();

    let data = {};

    inputFields.forEach((field) => {
      data[field.label.toLowerCase()] = field.value;
    });

    try {
      await addDoc(ref, data);
      // Clear input fields after successful save
      setInputFields(inputFields.map((field) => ({ ...field, value: "" })));
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e, id) => {
    const newInputFields = inputFields.map((field) =>
      field.id === id ? { ...field, value: e.target.value } : field
    );
    setInputFields(newInputFields);
  };

  return (
    <div className="contractor-container">
      <h2>Contractor Registration</h2>
      <form onSubmit={handleSave}>
        {inputFields.map((field) => (
          <div key={field.id} className="form-field">
            <label htmlFor={field.label}>
              {field.label.charAt(0).toUpperCase() + field.label.slice(1)}
            </label>
            <input
              type="text"
              id={field.label}
              value={field.value}
              onChange={(e) => handleChange(e, field.id)}
            />
          </div>
        ))}
        <button type="submit">Save now</button>
      </form>
    </div>
  );
};

export default Contractor;
