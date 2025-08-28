import React, { useContext, useState, useEffect } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
const Navbar = ({ setShowLogin }) => {
  const { getTotalAmount, token, setToken, url, logout, user } =
    useContext(StoreContext); // ✅ Added url here
  const [menu, setMenu] = useState("");
  const navigate = useNavigate()
  return (
    <div className="fixed top-0 left-0 w-full h-20 backdrop-blur-3xl bg-white/20 shadow-md z-50 flex items-center justify-evenly px-4">
      {/* Logo */}
      <Link to="/">
        <img src={assets.logo} alt="Logo" className="logo" />
      </Link>

      {/* Navbar Menu */}
      <ul className="navbar-menu flex gap-6 font-medium">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={`${menu === "home" ? "active text-orange-500" : ""}`}
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={`${menu === "menu" ? "active text-orange-500" : ""}`}
        >
          Menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={`${menu === "mobile-app" ? "active text-orange-500" : ""}`}
        >
          Mobile App
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={`${menu === "contact-us" ? "active text-orange-500" : ""}`}
        >
          Contact Us
        </a>
      </ul>

      {/* Right Section */}
      <div className="navbar-right flex items-center gap-4">
        {/* Search Icon */}
   
                <img src={assets.search_icon} alt="Search" className="cursor-pointer" />
        

        {/* Cart Icon */}
        <div className="relative">
          <Link to="/card">
            <img
              src={assets.basket_icon}
              alt="Cart"
              className="cursor-pointer"
            />
          </Link>
          {getTotalAmount() !== 0 && (
            <div className="absolute -top-1 -right-1 bg-red-500 w-3 h-3 rounded-full"></div>
          )}
        </div>

        {/* Sign In / Profile */}
        {!token ? (
          <button
            onClick={() => setShowLogin(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition"
          >
            Sign in
          </button>
        ) : (
          <div className="relative group gap-4 flex">
            <img
              src={assets.profile_icon}
              alt="Profile"
              className="cursor-pointer rounded-full"
            />
            
              {user ? (
                <p className="text-xl font-bold text-black">
                  Welcome {user} 👋
                </p>
              ) : (
                <p className="text-lg font-bold text-black">Welcome Guest</p>
              )}
         

            {/* Hover Menu */}
            <div className="absolute top-full left-0 bg-orange-300 mt-2 w-25 h-fit p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-2 z-50">
             <button
                onClick={() => navigate("/myorder")}
                className="bg-orange-400 p-2 shadow w-full flex justify-center rounded"
              >
                <img
                  src={assets.bag_icon}
                  alt="Orders"
                  className="size-8 filter invert brightness-0"
                />
              </button>
              <button
                onClick={() => logout()}
                className="bg-orange-400 p-2 shadow w-full flex justify-center rounded"
              >
                <img
                  src={assets.logout_icon}
                  alt="Logout"
                  className="size-8 filter invert brightness-0"
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
