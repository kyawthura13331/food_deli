import React, { useContext, useState } from "react";

import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
const Card = () => {
 
  const { cartItems, food_list, removeFromCart,getTotalAmount ,url} = useContext(StoreContext);

  const navigate = useNavigate()
  return (
    
      <div className="">
        <div className="grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] gap-26 items-center">
          <p>Item</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        <br />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index}>
                
                <div className="font-bold grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.3fr] gap-20 items-center size-max[1vw,12px]">
                  <img className="m-2" src={url+'/images/'+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p  className="cursor-pointer" onClick={()=>removeFromCart(item._id)}>❌</p>
                </div>
                
                <hr className=" border-1
                border-solid  bg-emerald-300" />
              </div>
            );
          }
        })}
     
     <div className="bg- mt-10 max-w-md mx-auto shadow-xs shadow-emerald-950 p-5 rounded-2xl">
    <h2 className="text-xl font-semibold mb-4">Cart Totals</h2>

    {/* Card Container */}
    <div className="bg-black/20 shadow-xs rounded-2xl p-6 space-y-4">
      {/* Subtotal */}
      <div className="grid grid-cols-[1fr_0.25fr]">
        <p>Subtotal</p>
        <p>${getTotalAmount()}</p>
      </div>
      <hr />

      {/* Delivery */}
      <div className="grid grid-cols-[1fr_0.25fr]">
        <p>Delivery Fee</p>
        <p>${getTotalAmount()===0?0:2}</p>
      </div>
      <hr />

      {/* Total */}
      <div className="grid grid-cols-[1fr_0.25fr] font-bold">
        <p>Total</p>
        <p>${getTotalAmount()===0?0:getTotalAmount()+2}</p>
      </div>

      {/* Checkout Button */}
    <button
  disabled={getTotalAmount() === 0}
  onClick={() => navigate('/order')}
  className={`w-full py-2 rounded-xl shadow-xs shadow-black transition 
    ${getTotalAmount() === 0 
      ? 'bg-gray-400 cursor-not-allowed text-white' 
      : 'bg-black/30 hover:bg-orange-500 hover:text-black text-white'}`}
>
  PROCEED TO CHECKOUT
</button>

    </div>

    {/* Promo Code */}
    <div className="mt-6">
      <p className="mb-2 text-sm">If you have a promo code, enter it here</p>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Promo code"
          className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        />
        <button className="bg-black text-white px-4 rounded-lg hover:bg-white/30 hover:shadow-xs hover:shadow-black transition hover:text-black">
          Submit
        </button>
      </div>
    </div>
  </div>


    </div>
  );
};

export default Card;
