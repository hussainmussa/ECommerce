import React from "react";
import './App.css'
import Home from "./pages/Home"
import Customer from "./pages/Customer"
import Contractor from "./pages/Contractor"
import DataPage from "./pages/ShowData"
import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Verification from "./pages/Verification";
import SearchPage from "./pages/SearchPage";


function App() {
 

  return (
    <div className="App">
     
     <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/SignUp" element={<SignUp/>} />
        <Route path="/Contractor" element={<Contractor/>} />
        <Route path="/ShowData" element={<DataPage/>} />
        <Route path="/Verification" element={<Verification/>} />
        <Route path="/SearchPage" element={<SearchPage/>} />

     </Routes>

    </div>
  );
}
export default App;

