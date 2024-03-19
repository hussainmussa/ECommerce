import React from 'react';
import './Welcome.css';
import logo from '../images/MainLogo.png';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {

    const navigate = useNavigate();

    const handleGetStartedClick = () => {
        navigate('/PhoneAuth'); 
      };


  return (
    <div className="welcome-container">
      <div className="image-container">
      <img src={logo} alt="Image" className="image-container" />
      </div>
      <div className="welcome-text">
        <h1>Welcome!</h1>
        <p>Get easy access to local services</p>
      </div>
      <button className="get-started-btn" onClick={handleGetStartedClick}>Get Started</button>
    </div>
  );
};

export default WelcomePage;
