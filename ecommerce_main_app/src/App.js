import React, { useEffect, useState } from 'react';
import firebase from './firebase/firebase';


function App() {
  const [customerCount, setCustomerCount] = useState(0);
  const [sellerCount, setSellerCount] = useState(0);

  useEffect(() => {
    // Firebase references for customer and seller counts
    const customerRef = firebase.database().ref('counts/customer');
    const sellerRef = firebase.database().ref('counts/seller');

    // Fetch initial counts
    customerRef.once('value').then((snapshot) => {
      setCustomerCount(snapshot.val() || 0);
    });

    sellerRef.once('value').then((snapshot) => {
      setSellerCount(snapshot.val() || 0);
    });

    // Update counts when they change in the database
    customerRef.on('value', (snapshot) => {
      setCustomerCount(snapshot.val() || 0);
    });

    sellerRef.on('value', (snapshot) => {
      setSellerCount(snapshot.val() || 0);
    });

    // Cleanup subscriptions on component unmount
    return () => {
      customerRef.off();
      sellerRef.off();
    };
  }, []);

  const handleRoleSelection = (role) => {
    // Update the count in the Firebase database
    const countRef = firebase.database().ref(`counts/${role}`);
    countRef.transaction((currentCount) => (currentCount || 0) + 1);
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

        {customerCount > 0 && (
          <p>Customer Count: {customerCount}</p>
        )}

        {sellerCount > 0 && (
          <p>Seller Count: {sellerCount}</p>
        )}
      </header>
    </div>
  );
}

export default App;

