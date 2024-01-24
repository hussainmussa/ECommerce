import React from "react";
import './App.css'
import Home from "./pages/Home"
import Customer from "./pages/Customer"
import Contractor from "./pages/Contractor"
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
     
     <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/customer" element={<Customer/>} />
        <Route path="/Contractor" element={<Contractor/>} />
     </Routes>
    </div>
  );
}
export default App;

