import React, { useEffect, useState } from "react";
import "./DataCard.css";
import myImage from "../images/HandyManBG.jpg";
import services from "../assets/services.jsx";
import googleMapsIcon from "../images/googleMapsIcon.png";
import wazeIcon from "../images/wazeIcon.png";
import appleMapsIcon from "../images/appleMapsIcon.png";
import axios from "axios";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import { FavoritesContext } from "../components/FavoritesContext";

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
  const { addFavorite, removeFavorite } = React.useContext(FavoritesContext);
  const location = useLocation();
  const { fullname, country, city, street, streetnumber, phonenumber, rating } =
    location.state;
  const [locationCor, setLocationCor] = useState([0, 0]);
  const [isHeartFilled, setHeartFilled] = useState(false);

  useEffect(() => {
    StringToCordination(city + " " + street + " " + streetnumber)
      .then((coords) => setLocationCor(coords))
      .catch((err) => console.error(err));
  }, [city, street, streetnumber]);

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
    }
    setHeartFilled(!isHeartFilled);
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
          <button className="heart" onClick={handleHeartClick}>
            {isHeartFilled ? <FaHeart color="red" /> : <FaRegHeart />}
          </button>
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
    </div>
  );
}

export default DataCard;
