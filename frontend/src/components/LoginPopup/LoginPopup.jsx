import React, { useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from 'axios'
const LoginPopup = ({ setShowLogin }) => {
  const {url,setToken,token}=useContext(StoreContext)
  const navigate = useNavigate();
  const [currState, setCurrState] = useState("Login");
  const [data,setData]=useState({
    name:"",
    email:"",
    password:""
  })


  const onchangHandle =(event)=>{
    const name = event.target.name;
    const value = event.target.value;
    
    setData({...data,[name]:value})
  }
 const onLogin = async(event)=>{
  event.preventDefault();
  let newUrl =url;
  if(currState==="Login"){
    newUrl += "/api/user/login"
    
  }
  else{
    newUrl += "/api/user/register"
  }
  const response = await axios.post(newUrl,data);
  if(response.data.success){
    setToken(response.data.token)
    localStorage.setItem("token",response.data.token);
    setShowLogin(false)
    navigate('/')
  } 
  else{
   console.log(response)
    
  }
 }
  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? (
            <></>
          ) : (
            <input type="text" name="name" onChange={onchangHandle} value={data.name} placeholder="Your Name" required />
          )}
          <input type="email"  name="email" onChange={onchangHandle} value={data.email} placeholder="Your Email" required />
          <input type="password" name="password" onChange={onchangHandle} value={data.password} placeholder="*********" required />
        </div>
        <button type="submit">{currState === "Sign Up" ? "Create account" : "Login"}</button>
        <div className='flex gap-4'>
          <input type="checkbox" required  className="mt-3"/>
          <p>By Continuing,i agree to the terms of use & privacy policy.</p>
        </div>
        {currState === "Login" ? (
          <p  onClick={()=>setCurrState("Sign Up")}>
            Creat a new account? <span className="text-red-600 cursor-pointer ">Click here</span>
          </p>
        ) : (
          <p onClick={()=>setCurrState("Login")}>
            Already have an account?<span className="text-red-600 cursor-pointer">Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
