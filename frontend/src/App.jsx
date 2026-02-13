import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Signup from './pages/Signup';
import UserDashboard from './pages/UserDashboard.jsx';
import CreateMealTrain from './pages/CreateMealTrain';

import './App.css';

function App() {
  return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<div>Home Page - Coming Soon</div>} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/create-meal-train" element={<CreateMealTrain />} />
        <Route path="/single-meal-view" element={<SingleMealView />} />
      </Routes>
  );
}

export default App;
