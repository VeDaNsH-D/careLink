import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './Navbar.jsx'
import './Navbar.css'
import './App.css'
import { Routes, Route,useLocation } from "react-router-dom";
import Register from "./Register.jsx";
import Login from "./Login.jsx";
import Footer from "./Footer.jsx"; // ✅ import as component
import './Footer.css'
import DoctorRegister from "./DoctorRegister";
import WorkerRegister from "./WorkerRegister";


function App() {

  
  
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<h1>Heyyy</h1>} />
          <Route path="/healthCard" element={<h1>Welcome to card</h1>} />
          <Route path="/register" element={<Register />} />             {/* card selection */}
          <Route path="/register/doctor" element={<DoctorRegister />} /> {/* doctor registration form */}
          <Route path="/register/worker" element={<WorkerRegister />} /> {/* worker registration form */}
          <Route path="/login" element={<Login />} />

          {/* Add these placeholders for now */}
          <Route path="/medical-records" element={<h1>Medical Records Page</h1>} />
          <Route path="/find-doctors" element={<h1>Find Doctors Page</h1>} />
          <Route path="/surveillance" element={<h1>Surveillance Page</h1>} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App
