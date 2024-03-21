import React, { useState } from "react";
import { firestore } from "../firebase";
import { addDoc, collection } from "@firebase/firestore";
import "./Contractor.css"; 
import BottomBar from "../components/BottomBar";
import { useLocation, useNavigate } from "react-router-dom";

const Contractor = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { phoneNumber } = location.state || {};
  const [inputFields, setInputFields] = useState([
    { id: 1, label: "fullname", value: "", error: "" },
    { id: 2, label: "country", value: "", error: "" },
    { id: 3, label: "city", value: "", error: "" },
    { id: 4, label: "street", value: "", error: "" },
    { id: 5, label: "streetnumber", value: "", error: "" },
    { id: 6, label: "phonenumber", value: phoneNumber || "", error: "" },
    { id: 7, label: "ID", value: "", error: "" },
    { id: 8, label: "jobfield", value: "", error: "" },
  ]);

  const ref = collection(firestore, "Contractors");
  
  const handleSave = async (e) => {
    e.preventDefault();

    const newInputFields = inputFields.map((field) => ({
      ...field,
      error: field.value.trim() === "" ? "This field is required" : "",
    }));

    setInputFields(newInputFields);

    if (newInputFields.some((field) => field.error !== "")) {
      return;
    }

    let data = {};

    inputFields.forEach((field) => {
      data[field.label.toLowerCase()] = field.value;
    });

    try {
      await addDoc(ref, data);
      setInputFields(inputFields.map((field) => ({ ...field, value: "", error: "" })));
    } catch (error) {
      console.error(error);
    }
    navigate("../ProfilePage");
  };

  const handleChange = (e, id) => {
    const { value } = e.target;

    const newInputFields = inputFields.map((field) => ({
      ...field,
      value: field.id === id ? 
             (["fullname", "country", "city", "street", "jobfield"].includes(field.label) ?
               value.replace(/[^a-zA-Z\s]/g, "") :
               (["phonenumber", "ID", "streetnumber"].includes(field.label) ?
                 value.replace(/[^0-9]/g, "") :
                 value))
             : field.value
    }));

    setInputFields(newInputFields);
  };

  return (
    <div className="BG-container">
      <h2>Contractor Registration</h2>
      <div className="contractor-container">
        
        <form onSubmit={handleSave}>
          {inputFields.map((field) => (
            <div key={field.id} className="form-field">
              <label htmlFor={field.label}>
                {field.label.charAt(0).toUpperCase() + field.label.slice(1)}
              </label>
              <div className="input-container">
                <input
                  type="text"
                  id={field.label}
                  className="input1"
                  value={field.value}
                  onChange={(e) => handleChange(e, field.id)}
                  readOnly={field.label === "phonenumber"}
                />
                {field.error && <div className="error-message">{field.error}</div>}
              </div>
            </div>
          ))}
          <button type="submit" className="button1">Save now</button>
        </form>
      </div>
      <BottomBar />
    </div>
  );
};

export default Contractor;
