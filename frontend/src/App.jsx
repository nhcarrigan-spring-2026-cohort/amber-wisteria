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
import NotFound from './pages/NotFound.jsx';
import EditMealTrain from './pages/EditMealTrain.jsx';

function App() {
  return (
    <Routes>
      <Route element={<GuestRoutes />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      <Route path="/" element={<Home />} />

      <Route element={<PrivateRoutes />}>
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/create-meal-train" element={<CreateMealTrain />} />
        <Route path="/single-meal-view" element={<SingleMealView />} />
        <Route path="/create-meal/:id" element={<CreateMeal />} />
        <Route path="/view-meal-train/:id" element={<ViewMealTrain />} />
        <Route path="/edit-meal-train/:id" element={<EditMealTrain />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
