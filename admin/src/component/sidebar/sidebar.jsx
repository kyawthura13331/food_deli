import React from "react";
import assets from "../../assets/assets";
import { NavLink } from "react-router-dom";
import './sidebar.css'

const Sidebar = () => {
  return (
    <div
      className="w-[20vw] bg-black/5 rounded-xl shadow-xs h-90%
               m-3 p-5 text-black/60"
    >
      <div className="flex flex-col gap-4">
        <NavLink
          to="/add"
          className="sidebar-option flex items-center gap-4 p-3 border border-black rounded-lg
                       hover:bg-white shadow-xs hover:shadow-black hover:text-black
                       cursor-pointer transition [&.active]:bg-white [&.active]:shadow-black [&.active]:text-black"
        >
          <img src={assets.add_icon} alt="Add" className="w-6 h-6" />
          <p className="font-medium hidden sm:block">Add Item</p>
        </NavLink>

        <NavLink
          to="/list"
          className="sidebar-option flex items-center gap-4 p-3 border border-black rounded-lg
                       hover:bg-white shadow-xs hover:shadow-black hover:text-black
                       cursor-pointer transition [&.active]:bg-white [&.active]:shadow-black [&.active]:text-black"
        >
          <p className="text-2xl">🏷️</p>
          <p className="font-medium hidden sm:block">List Item</p>
        </NavLink>

        <NavLink
          to="/order"
          className="sidebar-option flex items-center gap-4 p-3 border border-black rounded-lg
                       hover:bg-white shadow-xs hover:shadow-black hover:text-black
                       cursor-pointer transition [&.active]:bg-white [&.active]:shadow-black [&.active]:text-black"
        >
          <p className="text-2xl">📝</p>
          <p className="font-medium hidden sm:block">Order</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;