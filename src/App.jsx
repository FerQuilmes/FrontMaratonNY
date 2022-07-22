import React from 'react'
import {BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Form from './pages/Form';
import AgeGatePage from './pages/AgeGatePage';
import ThankYouPage from './pages/ThankYouPage';
import './App.css'

function App() {
  let age = JSON.parse(localStorage.getItem("ageGatePassed") || sessionStorage.getItem("ageGatePassed"));

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/"  element={age === true ? <Navigate to="/form" replace /> : <Navigate to="/agegate" replace />} />
        <Route path="/agegate" element={age === true ? <Navigate to="/form" replace /> : < AgeGatePage />} />
        <Route path="/form" element={age === true ? < Form /> : <Navigate to="/agegate" replace />} />
        <Route path="/thankyou" element={age === true ? < ThankYouPage /> : <Navigate to="/agegate" replace />} />
        {/* <Route path="/bases-y-condiciones" element={< BasesPage />} /> */}
        {/* <Route path="/" element={< Form />} />
        <Route path="/agegate" element={< AgeGatePage />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
