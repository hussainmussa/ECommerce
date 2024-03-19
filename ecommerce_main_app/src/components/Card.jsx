import "./Card.css"; // Import external CSS file
import React from "react";
import myImage from "../images/HandyManBG.jpg";
import star from "../images/star.png";

const Card = ({ item, handleClick }) => {
  const fields = [
    { label: "City", key: "city" },
    { label: "Job", key: "jobfield" },
  ];


  const randomFloat = Math.round((Math.random() * 4 + 1) * 10) / 10;
  return (
    <div key={item.id} className="data-card" onClick={() => handleClick(item)}>
      
      <div className="card-content">
        <img src={myImage} alt="icon" className="data-image" />
        <div style={{ marginLeft: '50px' , width : '100px'}}>
          <div className="data-value name">{item.fullname}</div>
          <div style={{ marginTop: '-10px'}}>{item.city}</div>
          <div style={{fontWeight:'bold' , marginTop: '23px'}}>{item.jobfield}</div>     
        </div>
        <div style={{ marginLeft : '50px'}}>
          <div >{randomFloat}</div>   
          <img src={star}  style={{ width: '40px' , height: '40px'}} />
        </div>
      </div>

    </div>
  );
};

export default Card;
