// Customer.jsx
import React, { useState } from "react";
import { firestore } from "../firebase";
import { addDoc, collection } from "@firebase/firestore";
import './Customer.css'; // Import external CSS file
import Data from "./ShowData";

const Customer = () => {
  const [inputFields, setInputFields] = useState([
    { id: 1, label: "name", value: "" },
    { id: 2, label: "email", value: "" },
    { id: 3, label: "address", value: "" },
    { id: 4, label: "phone", value: "" }
  ]);

  const ref = collection(firestore, "Customers");

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
    <div className="customer-container">
      <h2>Welcome to the Customer Page!</h2>
      <p>This is a basic customer page. Customize it based on your project's needs.</p>


      <Data />

      {/* Add your customer-related content here */}
    </div>
  );
};

export default Customer;
