import React, { useEffect, useState } from 'react'
import Navbar from './components/Nav/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import Card from './pages/Card/Card.jsx'
import Placeorder from './pages/Placeorder/Placeorder.jsx'
import Footer from './components/Footer/Footer.jsx'

import LoginPopup from './components/LoginPopup/LoginPopup.jsx'
import { ToastContainer } from "react-toastify";
import MyOrder from './pages/myOrder/myOrder.jsx'
const App = () => {
  const [showLogin,setShowLogin]=useState(false)

  return (
    <>
    {
    showLogin?<LoginPopup setShowLogin={setShowLogin}/>
    :
    <></>
    }
    <div className='app'>
      <Navbar setShowLogin={setShowLogin} />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/card' element={<Card/>}/>
        <Route path='/order' element={<Placeorder/>}/>
        <Route path='/myorder' element={<MyOrder/>}/>
         

      </Routes>
   </div>
   <Footer/>
    </>
    
  )
}

export default App