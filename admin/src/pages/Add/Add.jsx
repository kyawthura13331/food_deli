import React, {  useState } from "react";
import assets from "../../assets/assets";
import axios from 'axios'
import { toast } from "react-toastify";
const Add = ({url}) => {
  
    const [image,setImage]=useState(false);
    const [data,setData]=useState({
        name:"",
        description:"",
        category:"Salad",
        price:"",
    })
    const handleOnchange=(event)=>{
        const name = event.target.name;
        const value = event.target.value;

        setData(data=>({...data,[name]:value}))
    }
    const handleSumit= async (event)=>{
        event.preventDefault();
        const formdata=new FormData()
        formdata.append("name",data.name)
        formdata.append("description",data.description)
        formdata.append("price",Number(data.price))
        formdata.append("category",data.category)
        formdata.append("image",image)
        
        const response= await axios.post(`${url}/api/food/add`,formdata)
        if(response.data.success){
        setData({
        name:"",
        description:"",
        price:"",
        category:"Salad",
    }) 
    setImage(false)
    toast.success(response.data.message)
        }
        else{
            toast.error(response.data.message)
        }
    }
    
  return (
    <div className="flex justify-center  mt-3 bg-gray-100 p-6 w-3/4 ml-10 px-20">
      <form onSubmit={handleSumit} className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg flex flex-col gap-5">
        {/* Upload Image */}
        <div className="flex flex-col items-center">
          <label
            htmlFor="image"
            className="cursor-pointer flex flex-col items-center gap-2 border-2 border-dashed border-gray-300 rounded-xl p-5 hover:bg-gray-50 transition"
          >
            <img src={image ? URL.createObjectURL(image):assets.upload_area} alt="Upload" className="w-25 h-20" />
            <span className="text-gray-600 text-sm font-medium">
              Click to upload image
            </span>
          </label>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required />
        </div>

        {/* Product Name */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Product Name</label>
          <input
            type="text"
            name="name"
            onChange={handleOnchange}
            value={data.name}
            placeholder="Enter product name"
            className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
        </div>

        {/* Product Description */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Product Description</label>
          <textarea
            name="description"
            value={data.description}
            onChange={handleOnchange}
            rows="4"
            placeholder="Write content here"
            className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          ></textarea>
        </div>
            <div className="flex justify-between flex-col sm:flex-row gap-10 ">
                <div>
                    <p>Product category</p>
                    <select name="category"
                            value={data.category}
                            onChange={handleOnchange}
                     className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none">
                        <option value="Salad">Salad</option>
                        <option value="Rolls">Rolls</option>
                        <option value="Deserts">Deserts</option>
                        <option value="Sandwich">Sandwich</option>
                        <option value="Cake">Cake</option>
                        <option value="Pure Veg">Pure Veg</option>
                        <option value="Pasta">Pasta</option>
                        <option value="Noodles">Noodles</option>
                    </select>
                </div>
                 <div>
                <p>Product Price</p>
                <input type="Number" value={data.price} onChange={handleOnchange} name="price" placeholder="$20"
                 className="border w-30 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none "/>
            </div>
            </div>
           
        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default Add;
