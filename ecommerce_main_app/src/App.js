import React from "react";
import './App.css'
import Home from "./pages/home"


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

        
        <Home />
         

      </header>
    </div>
  );
}
export default App;

