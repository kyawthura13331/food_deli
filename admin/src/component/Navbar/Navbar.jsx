import React from 'react'
import assets from '../../assets/assets'
const Navbar = () => {
  return (
    <div className='flex justify-between w-[99%] h-fit items-center px-5'>
        <img src={assets.logo} alt="" />
        <img src={assets.profile_image} className='size-20 rounded-full' alt="" />
    </div>
  )
}

export default Navbar