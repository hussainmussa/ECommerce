import { Link } from "react-router-dom";
import './Shared.css';
import React, { useEffect, useState } from "react";
import { firestore } from "../firebase";
import { collection, getDocs, query, where } from "@firebase/firestore";


// ... (import statements)

const Customer = () => {
    const [data, setData] = useState([]);
    const [cities, setCities] = useState([]);
    const [fields, setFields] = useState([]); 
    const [searchCity, setSearchCity] = useState("");
    const [searchField, setSearchField] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(firestore, "Contractors"));
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
    }, []);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const querySnapshot = await getDocs(collection(firestore, "Contractors"));
                const uniqueCities = new Set();

                querySnapshot.forEach((doc) => {
                    uniqueCities.add(doc.data().city);
                });

                setCities(Array.from(uniqueCities));
            } catch (error) {
                console.error(error);
            }
        };

        fetchCities();
    }, []);

    useEffect(() => {
        const fetchFields = async () => {
            try {
                const querySnapshot = await getDocs(collection(firestore, "Contractors"));
                const uniqueFields = new Set();

                querySnapshot.forEach((doc) => {
                    uniqueFields.add(doc.data().jobfield);
                });

                setFields(Array.from(uniqueFields));
            } catch (error) {
                console.error(error);
            }
        };

        fetchFields();
    }, []);

    useEffect(() => {
        const fetchContractors = async () => {
            try {
                const fullDataSnapshot = await getDocs(collection(firestore, "Contractors"));
                const fullData = fullDataSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
                let filteredData = [...fullData]; // Copy all Contractors' data initially
    
                if (searchCity) {
                    filteredData = filteredData.filter(item => item.city === searchCity);
                }
    
                if (searchField) {
                    filteredData = filteredData.filter(item => item.jobfield === searchField);
                }
    
                setData(filteredData);
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchContractors();
    }, [searchCity, searchField]);
    


return (
  <div className="customer-container">
      <div className="header">
          <h2>
              Welcome to Handy JOBS
          </h2>
          <div className="login-label">
              <Link to="/customerlogin">Login</Link>
          </div>
      </div>

      

      {/* Autocomplete search bar for entering the city */}
      <input
          type="text"
          placeholder="Enter city"
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          list="cities"
          className="form-field"
      />
      <datalist id="cities">
          {cities.map((city) => (
              <option key={city} value={city} />
          ))}
      </datalist>

      {/* Autocomplete search bar for entering the field of work */}
      <input
          type="text"
          placeholder="Enter field of work"
          value={searchField}
          onChange={(e) => setSearchField(e.target.value)}
          list="fields"
      />
      <datalist id="fields">
          {fields.map((field) => (
              <option key={field} value={field} />
          ))}
      </datalist>

      {(searchCity && searchField) && (data.length === 0) && (
          <p>No contractors available for the specified city and field.</p>
      )}

      {data.length > 0 && (
          data.map((item) => (
              <div key={item.id} className="data-card">
                  <strong>PhoneNumber:</strong> {item.phonenumber} <br />
                  <strong>FullName:</strong> {item.fullname} <br />
                  <strong>City:</strong> {item.city} <br />
                  <strong>Job:</strong> {item.jobfield} <br />
              </div>
          ))
      )}

      {/* Add your customer-related content here */}
  </div>
);


};

export default Customer;
