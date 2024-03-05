import React, { useState } from "react";
import "./SignUp.css"; // Import external CSS file
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import axios from "axios"; // Import axios for making HTTP requests

function SignUp() {
  const initialState = ["First Name", "Last Name", "Phone Number", "ID"];
  const [formData, setFormData] = useState(
    initialState.reduce((acc, fieldName) => ({ ...acc, [fieldName]: "" }), {})
  );

  const handleInputChange = (fieldName, value) => {
    if (fieldName === "First Name" || fieldName === "Last Name") {
      const regex = /^[a-zA-Z]*$/;
      if (!regex.test(value)) {
        return;
      }
    } else if (fieldName === "Phone Number") {
      const regex = /^[0-9]*$/;
      if (!regex.test(value) || value.length > 10) {
        return;
      }
    } else if (fieldName === "ID") {
      const regex = /^[0-9]*$/;
      if (!regex.test(value) || value.length > 9) {
        return;
      }
    }
    setFormData((prevData) => ({ ...prevData, [fieldName]: value }));
  };

  const navigate = useNavigate(); // Instantiate useNavigate hook

  const handleVerifyClick = () => {
    // Generate a 6-digit verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000);

    // Send the verification code to the phone number
    // This requires a backend service or a third-party service
    // sendSMS(formData["Phone Number"], verificationCode);

    navigate("/verification"); // Navigate to verification page
  };

  return (
    <div className="frame">
      {initialState.map((fieldName) => (
        <div key={fieldName} className={`element`}>
          {formData[fieldName] ? null : (
            <div className="text-wrapper">{fieldName}</div>
          )}
          <input
            type="text"
            className="input-field"
            value={formData[fieldName]}
            onChange={(e) => handleInputChange(fieldName, e.target.value)}
          />
        </div>
      ))}
      <div className="text-wrapper-2">Please fill the details</div>
      <button className="overlap" onClick={handleVerifyClick}>
        <div className="text-wrapper-3">Verify</div>
      </button>
    </div>
  );
}

export default SignUp;
