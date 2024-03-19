// Contractor.jsx
import React, { useRef, useState } from "react";
import { firestore } from "../firebase";
import { addDoc, collection } from "@firebase/firestore";
import "./Contractor.css"; // Import external CSS file
import BottomBar from "../components/BottomBar";

const Contractor = () => {
  const [inputFields, setInputFields] = useState([
    { id: 1, label: "fullname", value: "", error: "" },
    { id: 2, label: "country", value: "", error: "" },
    { id: 3, label: "city", value: "", error: "" },
    { id: 4, label: "street", value: "", error: "" },
    { id: 5, label: "streetnumber", value: "", error: "" },
    { id: 6, label: "phonenumber", value: "", error: "" },
    { id: 7, label: "ID", value: "", error: "" },
    { id: 8, label: "jobfield", value: "", error: "" },
  ]);

  const ref = collection(firestore, "Contractors");

  const handleSave = async (e) => {
    e.preventDefault();

    const newInputFields = inputFields.map((field) => {
      if (field.value.trim() === "") {
        return { ...field, error: "This field is required" };
      } else {
        return { ...field, error: "" };
      }
    });

    setInputFields(newInputFields);

    // If any field has an error, return early
    if (newInputFields.some((field) => field.error !== "")) {
      return;
    }

    let data = {};

    inputFields.forEach((field) => {
      data[field.label.toLowerCase()] = field.value;
    });

    try {
      await addDoc(ref, data);
      // Clear input fields after successful save
      setInputFields(
        inputFields.map((field) => ({ ...field, value: "", error: "" }))
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e, id) => {
    const newInputFields = inputFields.map((field) => {
      if (field.id === id) {
        let value = e.target.value;

        // Full name, country, city, street, and job field limited to letters
        if (
          ["fullname", "country", "city", "street", "jobfield"].includes(
            field.label
          )
        ) {
          value = value.replace(/[^a-zA-Z\s]/g, "");
        }

        // Phone number, ID and street number limited to numbers
        if (["phonenumber", "ID", "streetnumber"].includes(field.label)) {
          value = value.replace(/[^0-9]/g, "");
        }

        return { ...field, value: value };
      }

      return field;
    });

    setInputFields(newInputFields);
  };

  return (
    <div className="BG-container">
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
              className="input1"
              value={field.value}
              onChange={(e) => handleChange(e, field.id)}
            />
            {field.error && <div style={{ color: "red" }}>{field.error}</div>}
          </div>
        ))}
        <button type="submit">Save now</button>
      </form>
      </div>
      <BottomBar/>
    </div>
  );
};

export default Contractor;
