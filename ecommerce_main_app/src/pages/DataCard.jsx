import React, { useEffect, useState } from "react";
import "./DataCard.css";
import myImage from "../images/HandyManBG.jpg";
import services from "../assets/services.jsx";
import googleMapsIcon from "../images/googleMapsIcon.png";
import wazeIcon from "../images/wazeIcon.png";
import appleMapsIcon from "../images/appleMapsIcon.png";
import axios from "axios";
import { IoStarOutline, IoStar } from "react-icons/io5";
import { IoCall } from "react-icons/io5";
import { useLocation } from "react-router-dom";
<<<<<<< HEAD
import BottomBar from "./BottomBar.jsx";
=======
import { FavoritesContext } from "../components/FavoritesContext";
import BottomBar from "../components/BottomBar";
import { firestore } from '../firebase'; // Import your Firestore instance
import { collection, query, where, getDocs, doc, updateDoc, getDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
>>>>>>> main

async function StringToCordination(address) {
  const response = await axios.get(
    `https://nominatim.openstreetmap.org/search?format=json&q=${address}`
  );
  const data = response.data;
  if (data.length > 0) {
    return [data[0].lat, data[0].lon];
  } else {
    throw new Error("No results found");
  }
  
}


function DataCard() {
<<<<<<< HEAD
  const location = useLocation();
  const {
    id,
    fullname,
    country,
    city,
    street,
    streetnumber,
    phonenumber,
    rating,
  } = location.state;
  const [locationCor, setLocationCor] = useState([0, 0]);
  const [rate, setRating] = useState(0);
  const [isStarFilled, setStarFilled] = useState(false); // Add this line
  const [userPhoneNumber, setUserPhoneNumber] = useState(""); // Add this line
=======
  const navigate = useNavigate(); // Declare navigate function

  const { addFavorite, removeFavorite } = React.useContext(FavoritesContext);
  const location = useLocation();
  const { fullname, country, city, street, streetnumber, phonenumber, rating, documentIdd } = location.state;
  
  const [locationCor, setLocationCor] = useState([0, 0]);
  const [isHeartFilled, setHeartFilled] = useState(false);
  
  const [isEditMode, setIsEditMode] = useState(false);
  const [editableFullname, setEditableFullname] = useState(fullname);
  const [editableCountry, setEditableCountry] = useState(country);
  const [editableCity, setEditableCity] = useState(city);
  const [editableStreet, setEditableStreet] = useState(street);
  const [editableStreetNumber, setEditableStreetNumber] = useState(streetnumber);
  const [editableRating, setEditableRating] = useState(rating); 
  
  
  
  const fetchData = async (documentId) => {
    const docRef = doc(firestore, "Contractors", documentId);
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      const data = docSnap.data();
      // Update your component's state with the fetched data
      setEditableFullname(data.fullname); 
      setEditableCountry(data.country || '');
      setEditableCity(data.city || '');
      setEditableStreet(data.street || '');
      setEditableStreetNumber(data.streetnumber || '');
      setEditableRating(data.rating || '');
      // Add other fields as necessary
      console.log("there is such document!");
    } else {
      console.log("No such document!");
    }
  };
>>>>>>> main

  useEffect(() => {
    StringToCordination(city + " " + street + " " + streetnumber)
      .then((coords) => setLocationCor(coords))
      .catch((err) => {console.error(err); console.log(city + street + streetnumber);});
  }, [city, street, streetnumber]);

<<<<<<< HEAD
  const handleStarClick = () => {
    setStarFilled(!isStarFilled);
    if (!isStarFilled) {
      setRating(0);
=======
  useEffect(() => {
    if (phonenumber === "+16505554567") {
      setIsEditMode(true);
    }
  }, [phonenumber]);

  const handleSave = async () => {
    console.log("Document IDDDDDDDDDDDD:"); 
      //Get query that fits the phone number
    const contractorsRef = collection(firestore, "Contractors");
    const q = query(contractorsRef, where("phonenumber", "==", "+16505554567"));
    const querySnapshot = await getDocs(q);
    //Change the doc
    if (!querySnapshot.empty) {
      const documentId = querySnapshot.docs[0].id; // Get the document ID
      console.log("Document ID:", documentId); 
    
    const docRef = doc(firestore, 'Contractors', documentId);
    
      // Object to hold the updates
      let updates = {};

    // Check each field for changes and add to updates object if changed
    if (fullname !== editableFullname) updates.fullname = editableFullname;
    if (country !== editableCountry) updates.country = editableCountry;
    if (city !== editableCity) updates.city = editableCity;
    if (street !== editableStreet) updates.street = editableStreet;
    if (streetnumber !== editableStreetNumber) updates.streetnumber = editableStreetNumber;
    if (rating !== editableRating) updates.rating = editableRating;

  // Check if updates object is not empty
  if (Object.keys(updates).length > 0) {
    try {
      await updateDoc(docRef, updates);
      console.log("Document successfully updated");
      setIsEditMode(false); // Exit edit mode
      fetchData(documentId);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
         } else {
      console.log("No changes detected, no update performed");
       }
      setIsEditMode(false); // Exit edit mode after saving
      navigate('/ProfilePage');  
      
    }
  };

  const handleHeartClick = () => {
    const contractor = {
      fullname,
      country,
      city,
      street,
      streetnumber,
      phonenumber,
      rating,
    };
    if (isHeartFilled) {
      removeFavorite(contractor);
    } else {
      addFavorite(contractor);
>>>>>>> main
    }
  };

  const handleRatingClick = (num) => {
    setRating(num);

    // Send a request to your backend to update the contractor's rating
    axios.post(`/api/contractor/${id}/rating`, {
      contractorPhoneNumber: phonenumber,
      userPhoneNumber: userPhoneNumber,
      rating: num,
    });
  };

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${locationCor[0]},${locationCor[1]}`;
  const wazrMapsUrl = `https://waze.com/ul?ll=${locationCor[0]},${locationCor[1]}&navigate=yes`;
  const appleMapsUrl = `http://maps.apple.com/?ll=${locationCor[0]},${locationCor[1]}`;

  return (
    <div className="BG-container">
    <div className="mainContainer">
      <span className="body">Job details</span>
      <div>
        {isEditMode && (
          <button onClick={handleSave}>Save</button>
        )}
        <img src={myImage} alt="Job" className="jobImage" />
        <div className="icon-container">
          <div className="star-rating-container">
            <button className="star" onClick={handleStarClick}>
              {isStarFilled ? (
                <IoStar color="yellow" size={30} />
              ) : (
                <IoStarOutline size={30} />
              )}
            </button>
            {isStarFilled && (
              <div className="rating-bar">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button onClick={() => handleRatingClick(num)}>{num}</button>
                ))}
              </div>
            )}
          </div>
          <a href={`tel:${phonenumber}`} className="phone">
            <IoCall size={24} color="black" />
          </a>
        </div>
      </div>
      <pre className="jobDetails1">



      <div className="info">
  <div className="info-item">
    {isEditMode ? (
      <>
        <label htmlFor="fullname">Name:</label>
        <input
          id="fullname"
          value={editableFullname}
          onChange={(e) => setEditableFullname(e.target.value)}
        />
      </>
    ) : (
      `Name: ${fullname}`
    )}
  </div>

  <div className="info-item">
    {isEditMode ? (
      <>
        <label htmlFor="country">Country:</label>
        <input
          id="country"
          value={editableCountry}
          onChange={(e) => setEditableCountry(e.target.value)}
        />
      </>
    ) : (
      `Country: ${country}`
    )}
  </div>

  <div className="info-item">
    {isEditMode ? (
      <>
        <label htmlFor="city">City:</label>
        <input
          id="city"
          value={editableCity}
          onChange={(e) => setEditableCity(e.target.value)}
        />
      </>
    ) : (
      `City: ${city}`
    )}
  </div>

  <div className="info-item">
    {isEditMode ? (
      <>
        <label htmlFor="street">Street:</label>
        <input
          id="street"
          value={editableStreet}
          onChange={(e) => setEditableStreet(e.target.value)}
        />
      </>
    ) : (
      `Street: ${street}`
    )}
      </div>

        <div className="info-item">Phone number: {phonenumber}</div>
      <div className="info-item">Rating: {rating} stars</div>
      </div>

      </pre>
      {/*<p className="jobDetails">{services}</p>*/}
      <div className="MapsIconContainer">
        <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
          <img src={googleMapsIcon} alt="Google Maps" className="MapsIcon" />
        </a>
        <a href={wazrMapsUrl} target="_blank" rel="noopener noreferrer">
          <img src={wazeIcon} alt="Waze" className="MapsIcon" />
        </a>
        <a href={appleMapsUrl} target="_blank" rel="noopener noreferrer">
          <img src={appleMapsIcon} alt="Apple Maps" className="MapsIcon" />
        </a>
      </div>
<<<<<<< HEAD
      <BottomBar />
=======
      </div>
      <BottomBar/>
>>>>>>> main
    </div>
  );
}

export default DataCard;
