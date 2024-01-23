// Home.jsx
import React from 'react';

function Home() {
    return (
        <div>
            <header style={{ backgroundColor: '#333', color: '#fff', textAlign: 'center', padding: '1em' }}>
                <img src="your-logo.png" alt="Your Logo" style={{ width: '100px', height: 'auto', display: 'block', margin: '0 auto' }} />
            </header>

            <main style={{ textAlign: 'center', marginTop: '50px' }}>
                <a href="Customer" className="option" style={optionStyle}>Customer</a>
                <a href="Contracter" className="option" style={optionStyle}>Contracter</a>
            </main>
            
        </div>
    );
};

const optionStyle = {
    display: 'inline-block',
    margin: '20px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    textDecoration: 'none',
    color: '#333',
    fontSize: '18px',
    transition: 'background-color 0.3s',
};

export default Home;

