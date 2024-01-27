import React, { useRef, useState } from "react";
import { firestore } from "../firebase";
import { addDoc, collection } from "@firebase/firestore";

const Contracter = () => {
  const [inputFields, setInputFields] = useState([
    { id: 1, label: "phonenumber", value: "" },
    { id: 2, label: "city", value: "" },
    { id: 3, label: "fullname", value: "" },
    { id: 4, label: "jobfield", value: "" }
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
    <div>
      <form onSubmit={handleSave}>
        {inputFields.map((field) => (
          <div key={field.id}>
            <label> Enter {field.label} </label>
            <input
              type="text"
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

export default Contracter;
