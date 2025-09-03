import React, { useContext, useState } from "react";
import { toast } from 'react-toastify'; // Import toast function
import "./Placeorder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Placeorder = () => {
  const navigate = useNavigate();
  const { getTotalAmount, food_list, cartItems, url, token, setCartItems } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (event) => {
    event.preventDefault();

    // 1. Check if all fields are filled
    for (const key in data) {
      if (data[key].trim() === "") {
        toast.error("Please fill out all fields!");
        return;
      }
    }

    // 2. Check if cart is empty
    if (getTotalAmount() === 0) {
      toast.error("Your cart is empty. Please add items before placing an order!");
      return;
    }

    // 3. Prepare order items
    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });

    // 4. Create order data
    const orderData = {
      address: data,
      item: orderItems,
      amount: getTotalAmount() + 2,
    };

    try {
      // 5. Send request to backend
      const response = await axios.post(url + "/api/order/place", orderData, {
        headers: { token },
      });

      if (response.data.success) {
        // Show success toast
        toast.success("Order placed successfully!");
        
        // Clear form inputs
        setData({
          firstName: "",
          lastName: "",
          email: "",
          street: "",
          city: "",
          state: "",
          country: "",
          phone: "",
        });

        // Optional: Clear cart after successful order
        setCartItems({});
        
        // Navigate to My Orders
        navigate("/myorder");
      } else {
        // Show error toast if the backend responds with a failure
        toast.error("Failed to place order. Please try again!");
      }
    } catch (error) {
      console.error("Order error:", error);
      // Show generic error toast
      toast.error("Something went wrong. Please try again later!");
    } 
  };

  return (
    <form
      onSubmit={handlePlaceOrder}
      className="flex flex-col md:flex-row gap-8 p-4 md:p-8 max-w-6xl mx-auto"
    >
      <div className="flex-1">
        <h2 className="text-2xl font-semibold mb-6">Delivery Information</h2>
        {/* Form Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            name="firstName"
            required
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder="First Name"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
          />
          <input
            name="lastName"
            required
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            placeholder="Last Name"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
          />
          <input
            className="sm:col-span-2 w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
            required
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Email address"
          />
          <input
            type="text"
            required
            name="street"
            onChange={onChangeHandler}
            value={data.street}
            placeholder="Street"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
          />
          <input
            type="text"
            required
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            placeholder="City"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
          />
          <input
            type="text"
            required
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            placeholder="State"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
          />
          <input
            type="text"
            required
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            placeholder="Country"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
          />
          <input
            className="sm:col-span-2 w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
            required
            name="phone"
            onChange={onChangeHandler}
            value={data.phone}
            type="text"
            placeholder="Phone"
          />
        </div>
      </div>

      {/* Cart Totals */}
      <div className="w-full md:w-96">
        <h2 className="text-xl font-semibold mb-4">Cart Totals</h2>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-2">
            <p>Subtotal</p>
            <p>${getTotalAmount()}</p>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between items-center mb-2">
            <p>Delivery Fee</p>
            <p>${getTotalAmount() === 0 ? 0 : 2}</p>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between items-center font-bold text-lg">
            <p>Total</p>
            <p>${getTotalAmount() === 0 ? 0 : getTotalAmount() + 2}</p>
          </div>
          <button
            type="submit"
            disabled={getTotalAmount() === 0}
            className={`w-full py-3 mt-6 rounded-xl font-medium transition-colors duration-300 ${
              getTotalAmount() === 0
                ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                : "bg-orange-500 text-white hover:bg-orange-600"
            }`}
          >
            PROCEED TO PAY
          </button>
        </div>
      </div>
    </form>
  );
};

export default Placeorder;