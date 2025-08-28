import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";

const MyOrder = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrder = async () => {
    try {
      const response = await axios.post(
        url + "/api/order/userorder",
        {},
        { headers: { token } }
      );
      console.log(response.data)
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrder();
    }
  }, [token]);


  return (
    <div className="p-6 md:p-10 bg-gray-100 h-fit">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
        My Orders
      </h1>

      {data.length === 0 ? (
        <p className="text-gray-500 text-lg">No orders found.</p>
      ) : (
        <div className="space-y-5">
          {data.map((order, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-5 border border-gray-200 hover:shadow-lg transition duration-300"
            >
              {/* Order Header */}
              <div className="flex items-center gap-4">
                <img
                  src={assets.parcel_icon}
                  alt="Parcel"
                  className="w-12 h-12"
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">
                    {order.items.map((item, i) =>
                      i === order.items.length - 1
                        ? `${item.name} x${item.quantity}`
                        : `${item.name} x${item.quantity}, `
                    )}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {order.items.length} items
                  </p>
                </div>
                <p className="text-lg font-bold text-green-600">
                  ${order.amount}
                </p>
              </div>

              {/* Status + Button */}
              <div className="flex justify-between items-center mt-4">
                <p className="text-gray-600">
                  Status:{" "}
                  <span
                    className={`font-bold ${
                      order.status === "Delivered"
                        ? "text-green-600"
                        : order.status === "Pending"
                        ? "text-yellow-500"
                        : "text-blue-500"
                    }`}
                  >
                    {order.status}
                  </span>
                </p>

                <button  
                onClick={fetchOrder}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition">
                  Track Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrder;
