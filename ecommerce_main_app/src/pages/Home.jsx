import React, { useEffect, useState } from "react";
import "./Home.css";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import BottomBar from "./BottomBar";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

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

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign-out successful");
        window.location.href = "/PhoneAuth";
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  const Button = ({ text, emoji, linkTo, onClick }) => {
    return (
      <button
        className="rectangle"
        onClick={onClick || (() => linkTo && window.location.assign(linkTo))}
      >
        {emoji && <span className="user">{emoji}</span>}
        <span className="sign-up">{text}</span>
      </button>
    );
  };
  const navigate = useNavigate();

  const buttonsContent = [
    "Electrician", "Plumber", "Mechanic", "Marketing", "Construction",
    "Gardener", "House Cleaner", "Painter", "Roofer", "Locksmith"
  ];

  return (
    <div className="BG-container">
      <div className="main-container">

        <span className="text-container">How can we help you?</span>

        <button className="sign-out-button" onClick={handleSignOut}>
          <span className="sign-out">Sign out</span>
        </button>

        <div className="title-search-container">
          <div className="search-input-container">
            <input
              type="text"
              placeholder=" Type to search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-icon-button" onClick={() => navigate("/ShowData", { state: { searchTerm } })}>
              <FaSearch />
            </button>
          </div>
        </div>

        <div className="help-section">
          <div className="line"></div>
          <span className="help-text">Popular searches</span>
          <div className="line"></div>
        </div>

        <div className="scroll-container">
          {buttonsContent.map((button, index) => (
            <button
              key={index}
              className="scroll-button"
              onClick={() => navigate("/showdata", { state: { searchTerm: button } })}
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
