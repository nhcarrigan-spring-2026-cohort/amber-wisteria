import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserDashboard from './pages/UserDashboard.jsx';
import CreateMealTrain from './pages/CreateMealTrain';
import CreateMeal from './pages/CreateMeal.jsx';
import SingleMealView from './components/view-meal-train/SingleMealView.jsx';
import './App.css';
import ViewMealTrain from './pages/ViewMealTrain.jsx';
import PrivateRoutes from './utils/PrivateRoutes.jsx';
import GuestRoutes from './utils/GuestRoutes.jsx';

function App() {
  return (
    <Routes>
      <Route element={<GuestRoutes />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/create-meal-train" element={<CreateMealTrain />} />
        <Route path="/single-meal-view" element={<SingleMealView />} />
        <Route path="/create-meal" element={<CreateMeal />} />
        <Route path="/view-meal-train" element={<ViewMealTrain />} />
      </Route>
    </Routes>
  );
}

export default App;
