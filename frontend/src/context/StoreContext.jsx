import axios from "axios";
import { createContext, useEffect, useState, useMemo } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFood_list] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const url = "http://localhost:4000";
   const [user, setUser] = useState("");

  // Add to cart
  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] ? prev[itemId] + 1 : 1,
    }));

    if (token) {
      try {
        await axios.post(
          url + "/api/cart/add",
          { itemId },
          { headers: { token } }
        );
      } catch (err) {
        console.error("Add to cart failed:", err.response?.data || err.message);
      }
    }
  };

  // Remove from cart
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const newCount = (prev[itemId] || 0) - 1;
      return { ...prev, [itemId]: newCount > 0 ? newCount : 0 };
    });

    if (token) {
      try {
        await axios.post(
          url + "/api/cart/remove",
          { itemId },
          { headers: { token } }
        );
      } catch (err) {
        console.error("Remove from cart failed:", err.response?.data || err.message);
      }
    }
  };

  // Get total amount
  const getTotalAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  // Fetch food list
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + "/api/food/list");
      setFood_list(response.data.data);
    } catch (err) {
      console.error("Fetch food list failed:", err.response?.data || err.message);
    }
  };
const fetchUsername = async () =>{
 try {
    const response = await axios.get(url + "/api/user/profile", {
      headers: { token },
    });
    setUser(response.data.data);
    
    } catch (error) {
    console.log(error.message)
  }
}
  // Load cart data from backend
  const loadCartData = async (token) => {
    try {
      const response = await axios.get(
        url + "/api/cart/get",
        {},
        { headers: { token } }
      );
      setCartItems(response.data.cartData || {});
    } catch (error) {
     
    }
  };

  // Logout function
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    setCartItems({});
  };

  // Load data on page load
  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      
      if (token) {
        await loadCartData(token);
        await fetchUsername(token);
      }
    }

    loadData();
  }, [token]);

  // Persist token to localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    }
  }, [token]);

  const contextValue = useMemo(
    () => ({
      food_list,
      cartItems,
      addToCart,
      removeFromCart,
      getTotalAmount,
      token,
      setToken,
      logout,
      url,
      user,
      setCartItems,
    }),
    [food_list, cartItems, token, user  ]
  );

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
