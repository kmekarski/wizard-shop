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
import AddProduct from './components/AddProduct';
import UsersList from './components/UsersList';
import OrdersList from './components/OrdersList';
import { ProductsContext } from './context/productsContext';

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
          <Route path='/admin/add-product' element={<AddProduct />} />
          <Route path='/admin/view-products' element={<AllProducts header_title="Admin panel"
          header_subtitle="Choose product to edit or delete" linkToEdit={true} header_buttons={false}/>}/>
          <Route path='/admin/edit-product/:id' element={<AddProduct edit={true}/>} />
          <Route path='/admin/active-users' element={<UsersList type="active" />} />
          <Route path='/admin/blocked-users' element={<UsersList type="blocked" />} />
          <Route path='/admin/pending-orders' element={<OrdersList type="pending" />} />
          <Route path='/admin/completed-orders' element={<OrdersList type="completed" />} />
          <Route path='/admin/rejected-orders' element={<OrdersList type="rejected" />} />
          <Route path='/product/:id/add-review' element={<AddReview />} />
          
          
        </Routes>
      </div>
    </Router>
  )
}

export default App
