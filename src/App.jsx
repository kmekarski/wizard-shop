import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'
import Profile from "./components/Profile.jsx";
import Register from "./components/Register.jsx";
import Contact from "./components/Contact.jsx";
import Checkout from "./components/Checkout.jsx";
import AllProducts from './components/AllProducts';
import ProductPage from './components/ProductPage';
import AddReview from './components/AddReview';
import AdminPanel from './components/AdminPanel';

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
          <Route path='/products' element={<AllProducts />} />
          <Route path='/product/:id' element={<ProductPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/admin' element={<AdminPanel />} />
          <Route path='/product/:id/add-review' element={<AddReview />} />
          
        </Routes>
      </div>
    </Router>
  )
}

export default App
