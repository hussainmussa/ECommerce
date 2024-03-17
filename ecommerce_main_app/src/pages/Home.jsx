// Home.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // Import external CSS file
import { getAuth,signOut, onAuthStateChanged } from "firebase/auth";

function Home() {
  const auth = getAuth();
  const [phoneNumber, setPhoneNumber] = useState(null);

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
        window.location.href = '/PhoneAuth';
      })
      .catch((error) => {
        // An error happened.
        console.error("Error signing out:", error);
      });
  };
  
  const Button = ({ text, emoji, linkTo }) => {
    return (
      <button
        className="rectangle"
        onClick={() => linkTo && window.location.assign(linkTo)}
      >
        {emoji && <span className="user">{emoji}</span>}
        <span className="sign-up">{text}</span>
      </button>
    );
  };

  return (
    <div className="main-container">
      <span className="welcome">Welcome {phoneNumber} </span>
      <span className="to-our-platform">To Our Platform</span>
      <span className="please-sign-up">Please sign up </span>
      <Button
        text="Sign up"
        emoji={<div className="arrow-right" />}
        linkTo="/SignUp"
      />
      <button className="sign-out-button" onClick={handleSignOut}>
        <span className="sign-out">Sign out</span>
      </button>
      
      <span className="to-access-data">To access our data</span>
      <Button text="Contractor" emoji="🛠️" linkTo="/contractor" />
      <Button text="Data" emoji="📊" linkTo="/showdata" />
    </div>
  );
}

export default Home;

//      <Button text="Customer" emoji="👤" linkTo="/customer" />
