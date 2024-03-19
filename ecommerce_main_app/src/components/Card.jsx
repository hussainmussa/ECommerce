import "./Card.css"; // Import external CSS file
import React from "react";
import myImage from "../images/HandyManBG.jpg";

const Card = ({ item, handleClick }) => {
  const fields = [
    { label: "City", key: "city" },
    { label: "Job", key: "jobfield" },
  ];

  return (
    <div key={item.id} className="data-card" onClick={() => handleClick(item)}>
      <div className="card-content">
        
        <div>
          <div className="data-value name">{item.fullname}</div>
          {fields.map(({ label, key }) => (
            <div style={{ display: "flex", alignItems: "center" }} key={key}>
              <strong style={{ marginRight: "10px" }}>{label}:</strong>
              <div className="data-value">{item[key]}</div>
            </div>
          ))}
        </div>
        <img src={myImage} alt="icon" className="data-image" />
      </div>
    </div>
  );
};

export default Card;
