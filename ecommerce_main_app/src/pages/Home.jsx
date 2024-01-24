// Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import external CSS file

function Home() {
    return (
        <div className="container">
            <div className="background">
               
                <Link to="/customer" className="option">
                    Customer
                </Link>
                <Link to="/contractor" className="option">
                    Contractor
                </Link>
                
            </div>
            
        </div>
    );
}

export default Home;

