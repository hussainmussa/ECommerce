import React, { useEffect, useState } from "react";
import "./DataCard.css";
import myImage from "../images/HandyManBG.jpg";
import googleMapsIcon from "../images/googleMapsIcon.png";
import wazeIcon from "../images/wazeIcon.png";
import appleMapsIcon from "../images/appleMapsIcon.png";
import axios from "axios";
import { IoStarOutline, IoStar } from "react-icons/io5";
import { IoCall } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import BottomBar from "../components/BottomBar";
import { firestore } from "../firebase"; // Import your Firestore instance
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { deleteDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import trashCan from "../images/trash-bin.png";
import save from "../images/check.png";

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
  const navigate = useNavigate(); // Declare navigate function
  const location = useLocation();
  const {
    fullname,
    country,
    city,
    street,
    streetnumber,
    phonenumber,
    rating,
    
  } = location.state;
  const [locationCor, setLocationCor] = useState([0, 0]);
  const [isHeartFilled, setHeartFilled] = useState(false);
  const [isStarFilled, setStarFilled] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editableFullname, setEditableFullname] = useState(fullname);
  const [editableCountry, setEditableCountry] = useState(country);
  const [editableCity, setEditableCity] = useState(city);
  const [editableStreet, setEditableStreet] = useState(street);
  const [editableStreetNumber, setEditableStreetNumber] =
    useState(streetnumber);
  const [editableRating, setEditableRating] = useState(rating);
  const auth = getAuth();
  const [UserphoneNumber, setUserPhoneNumber] = useState(null);

  useEffect(() => {
    // Listen for changes in authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in.
        // Get user's phone number if available
        setUserPhoneNumber(user.UserphoneNumber);
      } else {
        // No user is signed in.
        setUserPhoneNumber(null);
      }
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, [auth]);

  const fetchData = async (documentId) => {
    const docRef = doc(firestore, "Contractors", documentId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      // Update your component's state with the fetched data
      setEditableFullname(data.fullname);
      setEditableCountry(data.country || "");
      setEditableCity(data.city || "");
      setEditableStreet(data.street || "");
      setEditableStreetNumber(data.streetnumber || "");
      setEditableRating(data.rating || "");
      // Add other fields as necessary
    } else {
      console.log("No such document!");
    }
  };

  const calculateAverageRating = async () => {
    // Get all ratings for the contractor
    const contractorsRef = collection(firestore, "Contractors");
    const q = query(contractorsRef, where("phonenumber", "==", phonenumber));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const contractorData = querySnapshot.docs[0].data();
      if (contractorData && contractorData.rating) {
        const ratings = contractorData.rating;
        console.log("braa log: " + ratings);
        const ratingValues = Object.values(ratings).map(
          (rating) => rating.rating
        );
        const averageRating =
          ratingValues.reduce((a, b) => a + b, 0) / ratingValues.length;
        const averageRatingWithTwoDecimals = averageRating.toFixed(2);
        setEditableRating(averageRatingWithTwoDecimals);
      } else {
        // Handle the case where ratings data is undefined
        console.log("Ratings data is undefined");
      }
    }
  };

  useEffect(() => {
    // Listen for changes in authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in.
        // Get user's phone number if available
        setPhoneNumber(user.phoneNumber);
      } else {
        // No user is signed in.
        setPhoneNumber(null);
      }
    });
    // Clean up subscription on unmount
    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    calculateAverageRating();
  }, [phonenumber]);

  useEffect(() => {
    // Listen for changes in authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("is this a user ? " + user.phoneNumber);
      if (user) {
        // User is signed in.
        // Get user's phone number if available
        setPhoneNumber(user.phoneNumber);
        console.log("success");
      } else {
        // No user is signed in.
        setPhoneNumber(null);
        console.log("fail");
      }
    });
    // Clean up subscription on unmount
    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    StringToCordination(city + " " + street + " " + streetnumber)
      .then((coords) => setLocationCor(coords))
      .catch((err) => {
        console.error(err);
        console.log(city + street + streetnumber);
      });
  }, [city, street, streetnumber]);

  const handleStarClick = () => {
    setStarFilled(!isStarFilled);
  };

  useEffect(() => {
    if (phonenumber === phoneNumber) {
      setIsEditMode(true);
    }
  }, [phonenumber, phoneNumber]);

  const handleRatingClick = async (ratingNumber) => {
    // Get the document that fits the phone number
    const contractorsRef = collection(firestore, "Contractors");
    const q = query(contractorsRef, where("phonenumber", "==", phonenumber));
    const querySnapshot = await getDocs(q);

    // Update the document
    if (!querySnapshot.empty) {
      const documentId = querySnapshot.docs[0].id; // Get the document ID
      const docRef = doc(firestore, "Contractors", documentId);

      // Get the current document
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();

      // Object to hold the updates
      let updates = {};
      console.log(phoneNumber);
      // Check if the user's phone number is already in the rating list
      if (data.rating && data.rating[phoneNumber]) {
        // If it exists, just update the rating
        updates[`rating.${phoneNumber}`] = {
          rating: ratingNumber,
        };
      } else {
        // If it doesn't exist, add the user's phone number and rating to the rating attribute
        updates[`rating.${phoneNumber}`] = {
          rating: ratingNumber,
        };
      }

      // Update the document
      try {
        await updateDoc(docRef, updates);
        console.log("Document successfully updated");
        calculateAverageRating();
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    }
  };

  const handleDelete = async () => {
    // Get query that fits the phone number
    const contractorsRef = collection(firestore, "Contractors");
    const q = query(contractorsRef, where("phonenumber", "==", phoneNumber));

    const querySnapshot = await getDocs(q);
    // Check if the query returned documents
    if (!querySnapshot.empty) {
      const documentId = querySnapshot.docs[0].id; // Get the document ID

      try {
        // Use deleteDoc to delete the document
        await deleteDoc(doc(firestore, "Contractors", documentId));
        console.log("Document successfully deleted!");
      } catch (error) {
        console.error("Error removing document: ", error);
      }
      navigate("/ProfilePage");
    }
  };

  const handleSave = async () => {
    //Get query that fits the phone number
    const contractorsRef = collection(firestore, "Contractors");
    const q = query(contractorsRef, where("phonenumber", "==", phoneNumber));

    const querySnapshot = await getDocs(q);
    //Change the doc
    if (!querySnapshot.empty) {
      const documentId = querySnapshot.docs[0].id; // Get the document ID
    
      const docRef = doc(firestore, "Contractors", documentId);

      // Object to hold the updates
      let updates = {};

      // Check each field for changes and add to updates object if changed
      if (fullname !== editableFullname) updates.fullname = editableFullname;
      if (country !== editableCountry) updates.country = editableCountry;
      if (city !== editableCity) updates.city = editableCity;
      if (street !== editableStreet) updates.street = editableStreet;
      if (streetnumber !== editableStreetNumber)
        updates.streetnumber = editableStreetNumber;
      if (rating !== editableRating) updates.rating = editableRating;

      // Check if updates object is not empty
      if (Object.keys(updates).length > 0) {
        try {
          await updateDoc(docRef, updates);
          setIsEditMode(false); // Exit edit mode
          fetchData(documentId);
        } catch (error) {
          console.error("Error updating document: ", error);
        }
      } else {
        console.log("No changes detected, no update performed");
      }
      setIsEditMode(false); // Exit edit mode after saving
      navigate("/ProfilePage");
    }
  };

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${locationCor[0]},${locationCor[1]}`;
  const wazrMapsUrl = `https://waze.com/ul?ll=${locationCor[0]},${locationCor[1]}&navigate=yes`;
  const appleMapsUrl = `http://maps.apple.com/?ll=${locationCor[0]},${locationCor[1]}`;

  return (
    <div className="BG-container">
      <div className="mainContainer">
        <span className="body">Job details</span>
        <div>
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
                    <button onClick={() => handleRatingClick(num)}>
                      {num}
                    </button>
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
            <div className="info-item">Rating: {editableRating} stars</div>
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
        {isEditMode && (
          <>
            <img
              src={save}
              alt="Edit"
              onClick={handleSave}
              style={{ marginTop: "10px", width: "40px", height: "40px" }}
            />
          </>
        )}
        {isEditMode && (
          <>
            <img
              src={trashCan}
              alt="Edit"
              onClick={handleDelete}
              style={{
                marginTop: "10px",
                marginLeft: "150px",
                width: "40px",
                height: "40px",
              }}
            />
          </>
        )}
      </div>
      <BottomBar />
    </div>
  );
}

export default DataCard;
