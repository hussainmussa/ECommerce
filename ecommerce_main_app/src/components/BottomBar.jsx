import React from "react";
import "./BottomBar.css"; // Make sure to create a corresponding CSS file for styling

const BottomBar = () => {
  return (
    <div className="bottom-bar">
      <a href="/home" className="bottom-icon">🏠 </a>
      <a href="/showdata" className="bottom-icon">🔍 </a>
      <a href="/ProfilePage" className="bottom-icon">👤 </a>
    </div>
  );
};

export default BottomBar;
