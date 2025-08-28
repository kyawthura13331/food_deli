import React from "react";
import assets from "../../assets/assets";
import { NavLink } from "react-router-dom";
import './sidebar.css'
const Sidebar = () => {
  return (
    <div
      className="w-[20vw] bg-black/5  rounded-xl shadow-xs h-screen
                   p-5 text-black/60"
    >
      <div className="flex flex-col gap-4">
        <NavLink to="/add"
          
          
            className="sidebar-option flex items-center gap-4 p-3 border border-black rounded-lg 
                         hover:bg-white shadow-xs  hover:shadow-black hover:text-black cursor-pointer transition "
          >
            <img src={assets.add_icon} alt="Add" className="w-6 h-6" />
            <p className="font-medium">Add Item</p>
          
        </NavLink>

        <NavLink to="/list"
          
            className="sidebar-option flex items-center gap-4 p-3 border border-black rounded-lg 
                         hover:bg-white shadow-xs  hover:shadow-black hover:text-black cursor-pointer transition">
          
            <img src={assets.order_icon} alt="List" className="w-6 h-6" />
            <p className="font-medium ">List Item</p>
         
        </NavLink>

        <NavLink to="/order"
          
            className="sidebar-option flex items-center gap-4 p-3 border border-black rounded-lg 
                        hover:bg-white shadow-xs  hover:shadow-black hover:text-black cursor-pointer transition"
          >
            <img src={assets.order_icon} alt="Order" className="w-6 h-6" />
            <p className="font-medium ">Order</p>
          
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
