// Customer.jsx
import { Link } from "react-router-dom";
import './Customer.css';
import Data from "./ShowData";
import logo from "../images/HandyManLogo.jpg";

import React, { useEffect, useState } from "react";
import { firestore } from "../firebase";
import { collection, getDocs, query, where } from "@firebase/firestore";

const Customer = () => {
    
    const [data, setData] = useState([]);
    const [searchCity, setSearchCity] = useState(""); // New state for the entered city

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Modify the query to filter based on the entered city
                const q = query(collection(firestore, "Contractors"), where("city", "==", searchCity));
                const querySnapshot = await getDocs(q);

                const newData = [];
                querySnapshot.forEach((doc) => {
                    newData.push({ id: doc.id, ...doc.data() });
                });

                setData(newData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [searchCity]); // Run the effect whenever the searchCity changes

    return (
      <div className="customer-container">
        <div className="header">
          <img src={logo} alt="Logo" className="logo" />
          <h2>
            Welcome 
        
          </h2>
          <div className="login-label">
            <Link to="/customerlogin">Login</Link>
          </div>
        </div>
  
        <h2>Data from Firestore:</h2>

        {/* Search bar for entering the city */}
        <input
            type="text"
            placeholder="Enter city"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
        />

        {data.map((item) => (
            <div key={item.id} className="data-card">
                
                <strong>PhoneNumber:</strong> {item.phonenumber} <br />
                <strong>FullName:</strong> {item.fullname} <br />
                <strong>City:</strong> {item.city} <br />
                <strong>Job:</strong> {item.jobfield} <br />
            </div>
        ))}
        
            
  
        {/* Add your customer-related content here */}
      </div>
    );
  };
  
  export default Customer;

  // ShowData.jsx
