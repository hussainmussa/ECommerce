// Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import external CSS file

function Home() {
    return (
        <div className="container">
            <div className="background">
                <h1>Welcome to Our Platform</h1>
                <div className="options-container">
                    <Link to="/customer" className="option">
                        <div className="option-content">
                            <span className="icon">👤</span>
                            <span className="label">Customer</span>
                        </div>
                    </Link>
                    <Link to="/contractor" className="option">
                        <div className="option-content">
                            <span className="icon">🛠️</span>
                            <span className="label">Contractor</span>
                        </div>
                    </Link>
                    <Link to="/showdata" className="option">
                        <div className="option-content">
                            <span className="icon">📊</span>
                            <span className="label">Data</span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Home;
