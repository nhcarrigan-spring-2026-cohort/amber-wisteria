import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<div>Home Page - Coming Soon</div>} />
      </Routes>
    </Router>
import { Route, Routes } from 'react-router'
import './App.css'

function App() {
  
  return (
    <Routes>
      {/* Note: Add routes to your page below (uncomment, edit or create new)
          path -> location of your page, amber-wisteria/login 
          element -> your page e.g, Login.jsx (don't forget to first import then use)*/}

      {/* <Route index element={<Homepage />} />
      <Route path='login' element={<LoginForm />} />
      <Route path='signup' element={<Signup />} />
      <Route path='user-dashboard' element={<UserDashboard />} />
      <Route path='create-meal-train' element={<CreateMealForm />} /> */}
    </Routes>
  )
}

export default App