import React from "react";
import './App.css'
import Home from "./pages/Home"
import Customer from "./pages/Customer"
import Contracter from "./pages/Contracter"
import { Route, Routes } from "react-router-dom";


function App() {
 

  return (
    <div className="App">
     
     <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/customer" element={<Customer/>} />
        <Route path="/Contracter" element={<Contracter/>} />
     </Routes>

    </div>
  );
}
export default App;

