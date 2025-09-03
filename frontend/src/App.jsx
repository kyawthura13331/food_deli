import React, { useState } from 'react';
import Navbar from './components/Nav/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Card from './pages/Card/Card.jsx';
import Placeorder from './pages/Placeorder/Placeorder.jsx';
import Footer from './components/Footer/Footer.jsx';
import LoginPopup from './components/LoginPopup/LoginPopup.jsx';
import MyOrder from './pages/myOrder/myOrder.jsx';

// Import the required components and CSS for React-Toastify
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {/* Conditionally render the LoginPopup */}
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}

      {/* The ToastContainer should be placed here */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/card' element={<Card />} />
          <Route path='/order' element={<Placeorder />} />
          <Route path='/myorder' element={<MyOrder />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;