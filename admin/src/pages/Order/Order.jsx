import React, { useState, useEffect } from "react";
import axios from "axios";
import assets from "../../assets/assets";

const Order = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all orders
  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  // Handle status change (UI + backend)
  const handleStatusChange = async (orderId, e) => {
    const newStatus = e.target.value;

    // Update UI instantly
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === orderId ? { ...order, status: newStatus } : order
      )
    );

    // Update status in backend
    try {
      await axios.post(`${url}/api/order/status`, {
        orderId,
        status: newStatus,
      });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Dynamic color classes based on status
  const getStatusColor = (status) => {
    switch (status) {
      case "Processing":
        return "bg-blue-500";
      case "Out for Delivery":
        return "bg-yellow-500";
      case "Delivered":
        return "bg-green-500";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="p-6 bg-gray-50 w-2/3 h-screen">
      <h1 className="text-3xl font-bold mb-6">🛒 Admin Orders</h1>

      {loading ? (
        <p className="text-gray-500">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="flex flex-col md:flex-row items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition"
            >
              {/* Left Section: Parcel Icon + Order Info */}
              <div className="flex items-center space-x-4 mb-3 md:mb-0">
                <img
                  src={assets.parcel_icon}
                  alt="parcel"
                  className="w-12 h-12"
                />
                <div>
                  <p className="font-semibold text-gray-700">
                    Order #{order._id.slice(-6)}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Middle Section: Items */}
              <div className="flex-1 px-6 text-gray-700 mb-3 md:mb-0">
                {order.items.map((item, i) => (
                  <span key={i}>
                    {item.name} x {item.quantity}
                    {i !== order.items.length - 1 && ", "}
                  </span>
                ))}
                <div className="text-black font-bold">
                  {order.address.firstName +" "+ order.address.lastName}
                  <p>{order.address.city + ", City"}</p>
                  <p>{order.address.street + ", Street"}</p>
                  <p>{order.address.phone}</p>
                </div>
              </div>

              {/* Right Section: Status + Total */}
              <div className="flex flex-col md:items-end space-y-2">
                <p className="font-medium text-gray-700">
                  Total: ${order.amount}
                </p>
                <p>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e)}
                    className={`px-3 py-1 rounded-full text-white text-sm cursor-pointer ${getStatusColor(
                      order.status
                    )}`}
                  >
                    <option value="Processing" className="bg-white text-black">
                      Processing
                    </option>
                    <option
                      value="Out for Delivery"
                      className="bg-white text-black"
                    >
                      Out for Delivery
                    </option>
                    <option value="Delivered" className="bg-white text-black">
                      Delivered
                    </option>
                  </select>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Order;
