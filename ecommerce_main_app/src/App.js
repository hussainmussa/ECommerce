import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Contractor from "./pages/Contractor";
import DataPage from "./pages/ShowData";
import PhoneAuth from "./pages/PhoneAuth";
import DataCard from "./pages/DataCard";
import ProfilePage from "./pages/ProfilePage";
import Welcome from "./pages/Welcome";
import User from "./pages/User";


function App() {
  return (
    
      <div className="App">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/PhoneAuth" element={<PhoneAuth />} />
          <Route path="/Contractor" element={<Contractor />} />
          <Route path="/ShowData" element={<DataPage />} />
          <Route path="/DataCard" element={<DataCard />} />
          <Route path="/ProfilePage" element={<ProfilePage />} />
          <Route path="/User" element={<User />} />
        </Routes>
      </div>
    
  );
}
export default App;
