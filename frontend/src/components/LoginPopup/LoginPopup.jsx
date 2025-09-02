import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({ name: "", email: "", password: "" });

  const onChangeHandle = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onLogin = async (e) => {
    e.preventDefault();
    let endpoint = currState === "Login" ? "/api/user/login" : "/api/user/register";

    try {
      const res = await axios.post(`${url}${endpoint}`, data);
      if (res.data.success) {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        setShowLogin(false);
        navigate("/");
      } else {
        console.log(res.data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-60 flex justify-center items-center z-1">
      <form
        onSubmit={onLogin}
        className="bg-white w-[90%] max-w-md p-6 rounded-xl shadow-xl animate-fade-in transition-all"
      >
        {/* Title & Close */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-[#F54748]">{currState}</h2>
          <img
            src={assets.cross_icon}
            onClick={() => setShowLogin(false)}
            alt="Close"
            className="w-5 h-5 cursor-pointer"
          />
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          {currState === "Sign Up" && (
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={onChangeHandle}
              placeholder="Your Name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          )}
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={onChangeHandle}
            placeholder="Your Email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={onChangeHandle}
            placeholder="********"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        {/* Terms */}
        <div className="flex items-start gap-2 mt-4 text-sm text-gray-600">
          <input type="checkbox" required className="mt-1" />
          <p>
            By continuing, I agree to the{" "}
            <span className="underline">terms of use</span> &{" "}
            <span className="underline">privacy policy</span>.
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-5 w-full bg-[#F54748] hover:bg-red-600 text-white py-2 rounded-md font-medium transition-transform duration-200 hover:scale-105"
        >
          {currState === "Sign Up" ? "Create Account" : "Login"}
        </button>

        {/* Toggle Text */}
        <p className="mt-4 text-center text-sm text-gray-700">
          {currState === "Login" ? (
            <>
              Don't have an account?{" "}
              <span
                className="text-red-600 cursor-pointer hover:underline"
                onClick={() => setCurrState("Sign Up")}
              >
                Sign Up
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                className="text-red-600 cursor-pointer hover:underline"
                onClick={() => setCurrState("Login")}
              >
                Login
              </span>
            </>
          )}
        </p>
      </form>

      {/* Animations */}
      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }

          .animate-fade-in {
            animation: fade-in 0.3s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default LoginPopup;
