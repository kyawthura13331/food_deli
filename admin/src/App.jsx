import React from 'react'
import Navbar from './component/Navbar/Navbar'
import Sidebar from './component/sidebar/sidebar'
import {Route, Routes} from 'react-router-dom'
import List from './pages/List/List'
import Order from './pages/Order/Order'
import Add from './pages/Add/Add'
  import { ToastContainer } from 'react-toastify';
const App = () => {
  const url="http://localhost:4000"
  return (
    <div className='bg-white'>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className='flex'>
        <Sidebar />
        
        <Routes>
            <Route path='/' element={<Add  url={url}/>}/>
            <Route path='/add' element={<Add url={url}/>}/>
            <Route path='/list' element={<List url={url}/>}/>
            <Route path='/order' element={<Order url={url}/>}/>
       
        </Routes>
      </div>
    </div>
  )
}

export default App