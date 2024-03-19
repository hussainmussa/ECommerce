import "./ProfilePage.css"; // Import the CSS file for styling
import BottomBar from "../components/BottomBar";
import React, {  useEffect, useState } from "react";
import { firestore } from "../firebase";
import { collection, getDocs } from "@firebase/firestore";

import { useNavigate,useLocation  } from "react-router-dom";
import Card from "../components/Card";
import { getAuth,signOut, onAuthStateChanged } from "firebase/auth";


// Define a functional component for the profile page
const ProfilePage = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedJobField, setSelectedJobField] = useState("");
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();
  const [phoneNumber, setPhoneNumber] = useState(null);
  const location = useLocation();
  
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign-out successful");
        window.location.href = "/PhoneAuth";
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(firestore, "Contractors")
        );
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

  const handleClick = (item) => {
    navigate("/datacard", {
      state: {
        fullname: item["fullname"],
        country: item.country,
        city: item.city,
        street: item.street,
        streetnumber: item["streetnumber"],
        phonenumber: item["phonenumber"],
      },
    });
  };

  const countries = [...new Set(data.map((item) => item.country))];
  const cities = [...new Set(data.map((item) => item.city))];
  const jobFields = [...new Set(data.map((item) => item["jobfield"]))];
  const filteredData = data.filter(item => 
    item["phonenumber"] === phoneNumber);


  const navigateToFavorite = () => {
    navigate("/favorite");
  };


  // Hardcoded profile data for demonstration
  const profileData = {
    name: "Jane Doe",
    icon: "👤",
    location: "New York, NY",
    job: "Software Developer",
    bio: "Passionate about creating impactful software. Lover of coffee and good books."
  };

  const Button = ({ text, emoji, linkTo }) => {
    return (
      <button
        className="rectangle"
        onClick={() => linkTo && window.location.assign(linkTo)}
      >
        <span>{text}</span>
      </button>
    );
  };

  return (
    <div className="BG-container">
      <button className="sign-out-button" onClick={handleSignOut}>
          <span className="sign-out">Sign out</span>
        </button>
    <div className="profile-container">
      <div className="profile-icon">{profileData.icon}</div>
      <div className="profile-name">{profileData.name}</div>
      <div className="profile-info">
        <strong>Location:</strong> {profileData.location}
      </div>
      <div className="profile-info">
        <strong>Job:</strong> {profileData.job}
      </div>
      <div className="profile-bio">{profileData.bio}</div>

<Button text="Add Bussiness" emoji="🛠️" linkTo="/contractor" />

      <div className="profile-bio">Bussinesses for {phoneNumber}:</div>

      <div className="data-card-container">
  {filteredData
    .filter(
      (item) =>
        (item["fullname"].toLowerCase().includes(searchTerm.toLowerCase()) ||
        item["jobfield"].toLowerCase().includes(searchTerm.toLowerCase()) ||
        item["country"].toLowerCase().includes(searchTerm.toLowerCase()) ||
        item["city"].toLowerCase().includes(searchTerm.toLowerCase())) &&
     
        (selectedCountry === "" || item["country"].toLowerCase() === selectedCountry.toLowerCase()) &&
        (selectedCity === "" || item["city"].toLowerCase() === selectedCity.toLowerCase()) &&
        (selectedJobField === "" || item["jobfield"].toLowerCase() === selectedJobField.toLowerCase())
    )
    .map((item) => (
      <Card key={item.id} item={item} handleClick={handleClick} />
    ))}
</div>

</div>
      <BottomBar/>
    </div>
  );
};

export default ProfilePage;
