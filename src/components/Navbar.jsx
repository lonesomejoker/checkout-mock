import React, { useContext, useState } from 'react'
import { Avatar, Badge, ConfigProvider, Drawer } from 'antd'
import { RiShoppingCartLine } from "react-icons/ri";
import CartProduct from './CartProduct';
import { useSelector } from 'react-redux';
import { LayoutContext } from '../layout/UserLayout';

const Navbar = () => {
  const{cart}=useSelector((state)=>state.cartslice)
  const {showDrawer,onClose,open}=useContext(LayoutContext);
  return (
    <div className=' bg-neutral-800 fixed w-full z-[99]'>
    <div className=' flex container text-white justify-between text-[1.3rem] font-[500]'>
      <h1>SysǪube</h1>
      <section className=' flex items-center gap-x-6'>
      <h2>HOME</h2>
      <Badge count={cart.length} color="green" showZero>
            <Avatar
              onClick={showDrawer}
              shape="square"
              icon={
                <RiShoppingCartLine className=" text-[20px] md:text-2xl" />
              }
            />
          </Badge>
          {open && (
            <ConfigProvider
              theme={{
                token: {
                  // Seed Token
                  colorBgBase: "rgb(229 231 235)",
                  colorText: "black",
                },
              }}
            >
              <Drawer
                width={window.innerWidth > 640 ? 400 : "65%"}
                title="Shopping Cart"
                onClose={onClose}
                open={open}
                className=" font-poppins"
              >
                <CartProduct />
              </Drawer>
            </ConfigProvider>
          )}
          </section>
    </div>
    </div>
  )
}

export default Navbar
