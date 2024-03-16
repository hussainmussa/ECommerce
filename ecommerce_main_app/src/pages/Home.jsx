// Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // Import external CSS file

function Home() {
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
      <span className="welcome">Welcome</span>
      <span className="to-our-platform">To Our Platform</span>
      <span className="please-sign-up">Please sign up </span>
      <Button
        text="Sign up"
        emoji={<div className="arrow-right" />}
        linkTo="/SignUp"
      />
      <span className="PhoneAuth">sign in  </span>
      <Button
        text="Sign in"
        emoji={<div className="arrow-right" />}
        linkTo="/PhoneAuth"
      />
      <span className="to-access-data">To access our data</span>
      <Button text="Contractor" emoji="🛠️" linkTo="/contractor" />
      <Button text="Data" emoji="📊" linkTo="/showdata" />
    </div>
  );
}

export default Home;

//      <Button text="Customer" emoji="👤" linkTo="/customer" />
