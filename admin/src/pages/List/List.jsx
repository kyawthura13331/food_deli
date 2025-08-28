import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({url}) => {
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
const removeFood = async (foodId)=>{

      const response = await axios.post(`${url}/api/food/remove`,{id:foodId});
      fetchList();
      if(response.data.success){
        toast.success(response.data.message)
      }
      else{
        toast.error("Fail to delete")
      }
}
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 w-2/3 ml-10">
      {/* Title */}
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        All Foods List
      </h2>

      {/* Table Header */}
      <div className="grid grid-cols-6 gap-4 bg-gray-100 px-4 py-3 rounded-lg text-gray-700 font-semibold text-sm">
        <b>Image</b>
        <b>Name</b>
        <b>Description</b>
        <b>Category</b>
        <b>Price</b>
        <b>Action</b>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-gray-200">
        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-6 gap-4 items-center px-4 py-3 hover:bg-gray-50 transition duration-200"
          >
            {/* Image */}
            <img
              src={`${url}/images/${item.image}`}
              alt={item.name}
              className="w-14 h-14 object-cover rounded-lg border"
            />

            {/* Name */}
            <p className="text-gray-800 font-medium truncate">{item.name}</p>

            {/* Description */}
            <p className="text-gray-600 text-sm truncate">
              {item.description}
            </p>

            {/* Category */}
            <p className="text-gray-700 text-sm">{item.category}</p>

            {/* Price */}
            <p className="text-green-600 font-semibold">${item.price}</p>

            {/* Delete Button */}
            <button onClick={()=>removeFood(item._id)} className=" w-20 h-10 px-3 py-1 rounded-lg cursor-pointer font-bold bg-white text-black shadow-xs shadow-black active:bg-black/60 active:text-white ">
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
