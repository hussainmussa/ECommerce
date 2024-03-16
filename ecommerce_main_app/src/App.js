import React from "react";
import "./App.css";
import Home from "./pages/Home";
import Contractor from "./pages/Contractor";
import DataPage from "./pages/ShowData";
import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import PhoneAuth from "./pages/PhoneAuth";
import Verification from "./pages/Verification";
import SearchPage from "./pages/SearchPage";
import DataCard from "./pages/DataCard";
import { FavoritesProvider } from "./components/FavoritesProvider";

function App() {
  return (
    <FavoritesProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<PhoneAuth />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/PhoneAuth" element={<PhoneAuth />} />
          <Route path="/Contractor" element={<Contractor />} />
          <Route path="/ShowData" element={<DataPage />} />
          <Route path="/Verification" element={<Verification />} />
          <Route path="/SearchPage" element={<SearchPage />} />
          <Route path="/DataCard" element={<DataCard />} />
        </Routes>
      </div>
    </FavoritesProvider>
  );
}
export default App;
