import React, { useState } from 'react';
import './App.css';

function App() {
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Our Website!</h1>
        <p>Please select your role:</p>

        <div>
          <button onClick={() => handleRoleSelection('customer')}>
            Customer
          </button>
          <button onClick={() => handleRoleSelection('seller')}>
            Seller
          </button>
        </div>

        {selectedRole && (
          <p>You have selected: {selectedRole}</p>
        )}
      </header>
    </div>
  );
}

export default App;
