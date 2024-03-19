// Home.jsx
import React, { useEffect, useState } from "react";
import "./Home.css"; // Import external CSS file
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import BottomBar from "./BottomBar";
import { useNavigate } from "react-router-dom";

function Home() {
  const auth = getAuth();
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Listen for changes in authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in.
        // Get user's phone number if available
        setPhoneNumber(user.phoneNumber);
      } else {
        // No user is signed in.
        setPhoneNumber(null);
      }
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, [auth]);

  const handleSignOut = () => {
    signOut(auth) // Call the signOut function
      .then(() => {
        // Sign-out successful.
        console.log("Sign-out successful");
        window.location.href = "/PhoneAuth";
      })
      .catch((error) => {
        // An error happened.
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
    { text: "Electrician" },
    { text: "Plumber" },
    { text: "Mechanic" },
    { text: "Marketing" },
    { text: "Construction" },
    { text: "Gardener" },
    { text: "House Cleaner" },
    { text: "Painter" },
    { text: "Roofer" },
    { text: "Locksmith" },
  ];

  return (
    <div className="main-container">
      <button className="sign-out-button" onClick={handleSignOut}>
        <span className="sign-out">Sign out</span>
      </button>
      <span className="text-container">Welcome To Our Platform</span>

      <div className="title-search-container">
        <input
          type="text"
          placeholder=" 🔍 Type to search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Button
        text="Search"
        emoji="🔍"
        onClick={() =>
          navigate("/ShowData", { state: { searchTerm: searchTerm } })
        }
      />

      <div className="help-section">
        <div className="line"></div>
        <span className="help-text">Popular searches</span>
        <div className="line"></div>
      </div>

      {/*
      <span className="to-access-data">To access our data</span>
      <Button text="Contractor" emoji="🛠️" linkTo="/contractor" />
      <Button text="Data" emoji="📊" linkTo="/showdata" />

      */}

      <div className="scroll-container">
        {buttonsContent.map((button, index) => (
          <button
            key={index}
            className="scroll-button"
            onClick={() =>
              navigate("/showdata", { state: { searchTerm: button.text } })
            }
          >
            {button.text}
          </button>
        ))}
      </div>

      <BottomBar />
    </div>
  );
}

export default Home;
