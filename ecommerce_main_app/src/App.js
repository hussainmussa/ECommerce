import React from "react";
import './App.css';
import Home from "./pages/Home";
import Customer from "./pages/Customer";
import Contractor from "./pages/Contractor";
import DataPage from "./pages/ShowData";
import CustomerLogin from "./pages/CustomerLogin";
import { Route, Routes } from "react-router-dom";


function App() {
 

  return (
    <div className="App">
     
     <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Customer" element={<Customer/>} />
        <Route path="/Contractor" element={<Contractor/>} />
        <Route path="/ShowData" element={<DataPage/>} />
        <Route path="/CustomerLogin" element={<CustomerLogin/>} />
     </Routes>

    </div>
  );
}
export default App;

