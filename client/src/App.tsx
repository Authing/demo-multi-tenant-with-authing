import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Dashboard } from './routes/Dashboard'
import { Home } from './routes/Home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
