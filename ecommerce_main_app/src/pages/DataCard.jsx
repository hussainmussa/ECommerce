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
import BottomBar from "./BottomBar.jsx";

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

  useEffect(() => {
    StringToCordination(city + " " + street + " " + streetnumber)
      .then((coords) => setLocationCor(coords))
      .catch((err) => console.error(err));
  }, [city, street, streetnumber]);

  const handleStarClick = () => {
    setStarFilled(!isStarFilled);
    if (!isStarFilled) {
      setRating(0);
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
    <div className="mainContainer">
      <t1 className="body">Job details</t1>
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
        Name: {fullname}
        {"\n"}Country: {country}
        {"\n"}City: {city}
        {"\n"}Street: {street} {streetnumber}
        {"\n"}Phone number: {phonenumber}
        {"\n"}Rating: {rating} stars
        {"\n"}
        {"\n"}
        {"\n"}
        {"\n"}
      </pre>
      <p className="jobDetails">{services}</p>
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
      <BottomBar />
    </div>
  );
}

export default DataCard;
