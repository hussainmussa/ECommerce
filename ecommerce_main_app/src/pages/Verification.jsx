import React, { useState, createRef } from "react";
import "./Verification.css";
import { useNavigate } from "react-router-dom";

function Verification() {
  const [code, setCode] = useState(Array(6).fill(""));
  const inputRefs = Array(6)
    .fill()
    .map(() => createRef());

  const handleInputChange = (index, value) => {
    if (!/^[0-9]*$/.test(value) || value.length > 1) {
      return;
    }

    // If the current index is not 0 and the previous block is empty, return
    if (index !== 0 && !code[index - 1]) {
      return;
    }

    setCode((prevCode) => {
      const newCode = [...prevCode];
      newCode[index] = value;
      return newCode;
    });

    // If a number was entered, focus the next input field
    if (value && inputRefs[index + 1]) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, event) => {
    // If backspace was pressed and the field is empty, focus the previous input field
    if (event.key === "Backspace" && !code[index] && inputRefs[index - 1]) {
      inputRefs[index - 1].current.focus();
    }
  };

  const navigate = useNavigate();

  const handleVerifyClick = () => {
    navigate("/ShowData");
  };

  return (
    <div className="frame">
      <div className="blocks-container">
        {code.map((digit, index) => (
          <div key={index} className={`element1`}>
            <input
              type="text"
              className="input-field2"
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              ref={inputRefs[index]}
              maxLength="1"
            />
          </div>
        ))}
      </div>
      <div className="text-wrapperr-2">Please enter your code</div>
      <button className="overlapp" onClick={handleVerifyClick}>
        <div className="text-wrapperr-3">Verify Code</div>
      </button>
    </div>
  );
}

export default Verification;
