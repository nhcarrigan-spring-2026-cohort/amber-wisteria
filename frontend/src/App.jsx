import { Routes, Route } from "react-router-dom";
import UserDashboard from "./pages/UserDashboard.jsx";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<div>Home Page - Coming Soon</div>} />
      <Route path="/dashboard" element={<UserDashboard />} />
    </Routes>
  );
}

export default App;