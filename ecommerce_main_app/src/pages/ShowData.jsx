// ShowData.jsx
import React, { useEffect, useState } from "react";
import { firestore } from "../firebase";
import { collection, getDocs } from "@firebase/firestore";
import './ShowData.css'; // Import external CSS file

const ShowData = () => {
    const [data, setData] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const querySnapshot = await getDocs(collection(firestore, "Contractors"));
          console.log(querySnapshot); // Log the snapshot to check the structure
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
  
    return (
      <div className="data-container">
        <h2></h2>
        {data.map((item) => (
          <div key={item.id} className="data-card">
            {/* Exclude ID from being displayed */}
            <strong>Phone Number:</strong> {item.phonenumber} <br />
            <strong>Full Name:</strong> {item.fullname} <br />
            <strong>City:</strong> {item.city} <br />
            <strong>Job:</strong> {item.jobfield} <br />
          </div>
        ))}
      </div>
    );
  };
  
  export default ShowData;
