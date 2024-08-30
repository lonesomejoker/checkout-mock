import React, { createContext, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux';

export const LayoutContext = createContext(); //context API

const UserLayout = () => {
  const {cart}=useSelector((state)=>state.cartslice)
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const subTotal = cart.reduce((prev, item) => {
    return prev + item.price * item.quantity;
  }, 0);
  return (
    <LayoutContext.Provider value={{subTotal,showDrawer,onClose,open}}>
    <div className=' bg-gray-300'>
      <Navbar/>
      <div className=' pt-24'>
      <Outlet/>
      </div>
    </div>
    </LayoutContext.Provider>
  )
}

export default UserLayout
