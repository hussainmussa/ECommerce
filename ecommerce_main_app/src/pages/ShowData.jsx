import React, { useContext, useEffect, useState } from "react";
import { firestore } from "../firebase";
import { collection, getDocs } from "@firebase/firestore";
import "./ShowData.css"; // Import external CSS file
import { useNavigate, useLocation } from "react-router-dom";
import Select from "../components/Select";
import Card from "../components/Card";
import BottomBar from "./BottomBar";
import Fuse from "fuse.js";

const ShowData = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedJobField, setSelectedJobField] = useState("");
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [fuse, setFuse] = useState(null);

  const location = useLocation();
  useEffect(() => {
    if (location.state?.searchTerm) {
      setSearchTerm(location.state.searchTerm);
    }
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
  }, [location.state?.searchTerm]);

  useEffect(() => {
    const fuseInstance = new Fuse(data, {
      keys: ["full name", "job field", "country", "city"],
      includeScore: true,
      threshold: 0.3,
    });

    setFuse(fuseInstance);
  }, [data]);

  const handleClick = (item) => {
    navigate("/datacard", {
      state: {
        fullname: item["fullname"],
        country: item.country,
        city: item.city,
        street: item.street,
        streetnumber: item["streetnumber"],
        phonenumber: item["phonenumber"],
        documentIdd : item.id
      },
    });
  };

  const countries = [...new Set(data.map((item) => item.country))];
  const cities = [...new Set(data.map((item) => item.city))];
  const jobFields = [...new Set(data.map((item) => item["jobfield"]))];

  const selects = [
    {
      value: selectedCountry,
      setValue: setSelectedCountry,
      options: countries,
      defaultOption: "All Countries",
    },
    {
      value: selectedCity,
      setValue: setSelectedCity,
      options: cities,
      defaultOption: "All Cities",
    },
    {
      value: selectedJobField,
      setValue: setSelectedJobField,
      options: jobFields,
      defaultOption: "All Job Fields",
    },
  ];

  const navigateToFavorite = () => {
    navigate("/favorite");
  };

  const results = searchTerm
    ? fuse.search(searchTerm)
    : data.map((item) => ({ item }));

  return (
    <div className="data-container">
      <div className="title-search-container">
        <h2>Contractors</h2>
        <input
          type="text"
          placeholder="Type to search..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <button onClick={navigateToFavorite} className="button">Go to Favorite </button >
        <div className="title-search-container_row">
          {selects.map((select, index) => (
            <Select
              key={index}
              className="title-search-container"
              value={select.value}
              onChange={(e) => select.setValue(e.target.value)}
              options={select.options}
              defaultOption={select.defaultOption}
            />
          ))}
        </div>
      </div>
      <div className="data-card-container">
        {results
          .filter(
            (result) =>
              (selectedCountry === "" ||
                result.item.country.toLowerCase() ===
                  selectedCountry.toLowerCase()) &&
              (selectedCity === "" ||
                result.item.city.toLowerCase() ===
                  selectedCity.toLowerCase()) &&
              (selectedJobField === "" ||
                result.item["jobfield"].toLowerCase() ===
                  selectedJobField.toLowerCase())
          )
          .map((result) => (
            <Card
              key={result.item.id}
              item={result.item}
              handleClick={handleClick}
            />
          ))}
      </div>
      <BottomBar />
    </div>
  );
};

export default ShowData;
