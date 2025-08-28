import React, { useContext, useState } from "react";
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

  // ✅ Input change handler
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Place order handler
  const handlePlaceOrder = async (event) => {
    event.preventDefault();

    // 1. Check if all fields are filled
    for (const key in data) {
      if (data[key].trim() === "") {
        alert("Please fill out all fields!");
        return;
      }
    }

    // 2. Check if cart is empty
    if (getTotalAmount() === 0) {
      alert("Your cart is empty. Please add items before placing an order!");
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
        alert("Order placed successfully!");

        // ✅ Clear form inputs
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

        // ✅ Optional: Clear cart after successful order
        setCartItems({});
       
        // ✅ Navigate to My Orders
        navigate("/myorder");
     
      }
       else {
        alert("Failed to place order. Please try again!");
      }
    } catch (error) {
      console.error("Order error:", error);
      alert("Something went wrong. Please try again later!");
    } 
  };

  return (
    <form onSubmit={handlePlaceOrder} className="Order-deli relative mt-10">
      <h2 className="text-2xl">Delivery Information</h2>

      {/* Inputs */}
      <div className="grid grid-cols-2 w-fit p-4 gap-4 gap-x-20">
        <input
          name="firstName"
          required
          onChange={onChangeHandler}
          value={data.firstName}
          type="text"
          placeholder="First Name"
        />
        <input
          name="lastName"
          required
          onChange={onChangeHandler}
          value={data.lastName}
          type="text"
          placeholder="Last Name"
        />
        <input
          className="col-span-2"
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
        />
        <input
          type="text"
          required
          name="city"
          onChange={onChangeHandler}
          value={data.city}
          placeholder="City"
        />
        <input
          type="text"
          required
          name="state"
          onChange={onChangeHandler}
          value={data.state}
          placeholder="State"
        />
        <input
          type="text"
          required
          name="country"
          onChange={onChangeHandler}
          value={data.country}
          placeholder="Country"
        />
        <input
          className="col-span-2"
          required
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          type="text"
          placeholder="Phone"
        />
      </div>

      {/* Cart Totals */}
      <div className="mt-8 max-w-md mx-auto shadow-xs w-screen shadow-emerald-950 p-5 rounded-2xl absolute top-0 right-5">
        <h2 className="text-xl font-semibold mb-4">Cart Totals</h2>
        <div className="bg-black/20 shadow-xs rounded-2xl p-6 space-y-4">
          <div className="grid grid-cols-[1fr_0.25fr]">
            <p>Subtotal</p>
            <p>${getTotalAmount()}</p>
          </div>
          <hr />
          <div className="grid grid-cols-[1fr_0.25fr]">
            <p>Delivery Fee</p>
            <p>${getTotalAmount() === 0 ? 0 : 2}</p>
          </div>
          <hr />
          <div className="grid grid-cols-[1fr_0.25fr] font-bold">
            <p>Total</p>
            <p>${getTotalAmount() === 0 ? 0 : getTotalAmount() + 2}</p>
          </div>

          {/* Proceed Button */}
          <button
            type="submit"
            disabled={getTotalAmount() === 0}
            className={`w-full py-2 rounded-xl transition shadow-xs shadow-black ${
              getTotalAmount() === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-black/30 text-white hover:bg-orange-500 hover:text-black"
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
