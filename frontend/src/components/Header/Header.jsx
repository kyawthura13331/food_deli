import React from "react";
import image1 from "../../assets/header_img.png";

const Header = () => {
  return (
    <div
      className="header w-full h-[500px] md:h-[600px] bg-cover bg-center bg-no-repeat flex items-center pt-16 md:pt-24"
      style={{ backgroundImage: `url(${image1})` }}
    >
      {/* Overlay for better text visibility */}
      <div className="bg-black/40 p-6 md:p-12 rounded-lg max-w-2xl mx-auto text-xl text-center md:text-left">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
          Order your favourite food here
        </h2>
        <p className="text-white/90 mb-6">
          Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients.
        </p>
        <a href="#explore-menu">
          <button className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition">
            View Menu
          </button>
        </a>
      </div>
    </div>
  );
};

export default Header;
