import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Routes, Route } from "react-router-dom";
import UserDashboard from "./pages/UserDashboard.jsx";

function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<UserDashboard />} />
    </Routes>
  );
}

export default App;