import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'
import Profile from "./components/Profile.jsx";
import Register from "./components/Register.jsx";

import { Login, Logout } from './components/Login'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

library.add(fas, far)

function App() {

  return (
    <Router>
      <div className="app">
        <Sidebar />
        <Routes>
          <Route path='/' element={<MainContent />} />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
