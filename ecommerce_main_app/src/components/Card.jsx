import "../pages/ShowData.css"; // Import external CSS file

import React from "react";
import myImage from "../images/HandyManBG.jpg";

const Card = ({ item, handleClick }) => {
  const fields = [
    { label: "Full Name", key: "fullname" },
    { label: "Country", key: "country" },
    { label: "City", key: "city" },
    { label: "Job", key: "jobfield" },
  ];

  return (
    <div key={item.id} className="data-card" onClick={() => handleClick(item)}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img src={myImage} alt="icon" className="data-image" />
        <div>
          {fields.map(({ label, key }) => (
            <div style={{ display: "flex", alignItems: "center" }} key={key}>
              <strong style={{ marginRight: "10px" }}>{label}:</strong>
              <div className="data-value">{item[key]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
