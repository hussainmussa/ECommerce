import React from "react";
import "./BottomBar.css"; 
import { ImHome } from "react-icons/im";
import { CgProfile } from "react-icons/cg";
import { MdOutlineContentPasteSearch } from "react-icons/md";
const BottomBar = () => {
  return (
    <div className="bottom-bar">
      <a href="/home" className="bottom-icon"><ImHome/> </a>
      <a href="/showdata" className="bottom-icon"><MdOutlineContentPasteSearch /> </a>
      <a href="/ProfilePage" className="bottom-icon"><CgProfile /> </a>
    </div>
  );
};

export default BottomBar;
