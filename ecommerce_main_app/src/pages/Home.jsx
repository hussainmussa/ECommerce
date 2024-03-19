import React, { useEffect, useState } from "react";
import "./Home.css";
import { getAuth , onAuthStateChanged } from "firebase/auth";
import BottomBar from "../components/BottomBar";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import MainLogo from "../images/MainLogo.png";

function Home() {
  const auth = getAuth();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is signed in:", user.phoneNumber);
      } else {
        console.log("No user is signed in.");
      }
    });
    return () => unsubscribe();
  }, [auth]);

  

  const navigate = useNavigate();

  const buttonsContent = [
    "Electrician",
    "Plumber",
    "Mechanic",
    "Marketing",
    "Construction",
    "Gardener",
    "House Cleaner",
    "Painter",
    "Roofer",
    "Locksmith",
  ];

  return (
    <div className="BG-container">
      <div className="main-container">
      
        <img src={MainLogo} alt="Logo" className="main-logo" />
        
        <div className="title-search-container">
          <span className="text-container">How can we help you?</span>
          <div className="search-input-container">
            <input
              type="text"
              placeholder=" Type to search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="search-icon-button"
              onClick={() => navigate("/ShowData", { state: { searchTerm } })}
            >
              <FaSearch />
            </button>
          </div>
       
        <div className="help-section">
          <div className="line"></div>
          <span className="help-text">Popular searches</span>
          <div className="line"></div>
        </div>
        </div>
        <div className="scroll-container">
          {buttonsContent.map((button, index) => (
            <button
              key={index}
              className="scroll-button"
              onClick={() =>
                navigate("/showdata", { state: { searchTerm: button } })
              }
            >
              {button}
            </button>
          ))}
        </div>
      </div>
      <BottomBar />
    </div>
  );
  
}

export default Home;
