// Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import external CSS file
import glow from '../images/glow.png';

function Home() {
    return (
        <>
            <h1 className="welcome-text">Welcome</h1>
            <div className="combined-container">
                <div className="options-container">
                <h2 className="choice-text">What brings you here today:</h2>
                    <Link to="/customer" className="option">
                        <div className="option-content">
                            <span className="icon">👤</span>
                            <span className="label">Customer</span>
                            <span className="icon">👤</span>
                        </div>
                    </Link>
                    <Link to="/contractor" className="option">
                        <div className="option-content">
                            <span className="icon">🛠️</span>
                            <span className="label">Contractor</span>
                            <span className="icon">🛠️</span>
                        </div>
                    </Link>
                </div>

            </div>

            <h2>                
                <div className="contact-links">
                    <a href="/contact">Contact Us | Rate us</a>
                </div>
            </h2>

            <img src={glow} alt="Description of Image" className="fixed-bottom-right" />
            <img src={glow} alt="Description of Image" className="fixed-top-left" />
        </>
        
    );
}

export default Home;
