import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({ url }) => {
  const [list, setList] = useState([]);

  // Fetch Food List
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Failed to fetch food list!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error! Please try again later.");
    }
  };

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
    fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Fail to delete");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="w-auto h-160 max-w-7xl mx-auto p-4 md:p-8">
      {/* Title */}
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center md:text-left">
        All Foods List
      </h2>

      {/* Table Header (hidden on small screens) */}
      <div className="hidden md:grid grid-cols-6 gap-4 bg-gray-100 px-4 py-3 rounded-lg text-gray-700 font-semibold text-sm">
        <b>Image</b>
        <b>Name</b>
        <b>Description</b>
        <b>Category</b>
        <b>Price</b>
        <b>Action</b>
      </div>

      {/* Table Body */}
      <div className="md:divide-y md:divide-gray-200 mt-4">
        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 items-center px-4 py-3 my-4 md:my-0 hover:bg-gray-50 transition duration-200 border-b md:border-b-0"
          >
            {/* Image */}
            <div className="md:col-span-1">
              <img
                src={`${url}/images/${item.image}`}
                alt={item.name}
                className="w-full h-auto object-cover rounded-lg border md:w-14 md:h-14"
              />
            </div>
            
            {/* Name */}
            <div className="md:col-span-1">
              <p className="text-gray-800 font-medium truncate">{item.name}</p>
            </div>

            {/* Description */}
            <div className="hidden md:block md:col-span-1">
              <p className="text-gray-600 text-sm truncate">{item.description}</p>
            </div>

            {/* Category */}
            <div className="md:col-span-1">
              <p className="text-gray-700 text-sm md:hidden font-bold">Category:</p>
              <p className="text-gray-700 text-sm">{item.category}</p>
            </div>

            {/* Price */}
            <div className="md:col-span-1">
              <p className="text-green-600 font-bold text-lg md:text-base">${item.price}</p>
            </div>

            {/* Delete Button */}
            <div className="md:col-span-1">
              <button
                onClick={() => removeFood(item._id)}
                className="w-full h-10 px-3 py-1 rounded-lg cursor-pointer font-bold bg-white text-black shadow-xs shadow-black active:bg-black/60 active:text-white md:w-20"
              >
                X
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;