import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signup from './pages/Signup'

function App() {
  
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
    </Routes>
  )
}

export default App
