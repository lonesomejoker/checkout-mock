import React, { useState } from 'react'
import { PiShoppingCartSimpleBold } from 'react-icons/pi'
import { IoArrowUp } from "react-icons/io5";
import { cartData } from '../app/slices/CartSlice';
import { useDispatch } from 'react-redux';

const ProductReusable = ({data}) => {
    const dispatch=useDispatch();
    const [isHovered, setIsHovered] = useState(null);
    const [isClicked, setIsClicked] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const handleSize = (item) => {
      setIsClicked(null);
      dispatch(cartData({ ...item, size: selectedSize }));
    };
  return (
    <div className=' grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2.5 px-2'>
    {
      data.map((item)=>{
        return(
          <div key={item.id} className={`rounded-tl-[3rem] rounded-br-[3rem] ${
            isHovered === item.id
              ? "shadow shadow-violet-400 flex flex-col justify-between transition-transform duration-500 rounded-t-xl scale-110 z-10 overflow-hidden "
              : " duration-500"
          }`} 
          onMouseEnter={() => setIsHovered(item.id)}
          onMouseLeave={() => setIsHovered(null)}>
           <section className={` rounded-md`}>
            <img src={item.image} alt='clothes' className={`h-[11.8rem] md:h-[13.5rem] lg:h-[10rem] xl:h-[13.8rem] w-full mx-auto rounded-t-md`}/>
            <section className=' my-1 px-2 lg:flex justify-between items-start xl:items-center'>
            <h1 className='text-[16px] xl:text-lg font-semibold'>{item.name}</h1>
            <h1 className='text-[14px] text-violet-600 font-semibold xl:text-[16px] flex items-center lg:items-start gap-x-0.5'>{item.price} <span className='text-[12px]'>Rs</span></h1>
            </section>
            </section>
            <div className={`duration-300 fade-in-block opacity-${
           isHovered === item.id ? "100" : "0" } 
           ${isHovered === item.id ? "visible" : "invisible"} 
           transition-opacity duration-300 ease-in-out`}>
            <div className=" w-full text-[1rem] font-[500] text-white ">
                <section className=" flex text-violet-500 bg-neutral-800 px-3 py-2 gap-x-2 items-center justify-center" onClick={() => setIsClicked(item.id)}>
                { isClicked?(<>
                    <h2>Pick a size</h2>
                    <IoArrowUp className="text-sm md:text-2xl "/>
                    </>):
                  (<><h2 className=' text-[12px] md:text-auto font-[600] lg:text-[12px] xl:text-[15px]'>ADD TO CART</h2>
                    <PiShoppingCartSimpleBold 
                    className="text-sm md:text-2xl "/>
                    </>)
                }
                 
                </section>
                {isClicked === item.id && (
                  <div
                    className=" absolute top-0 bg-neutral-600 bg-opacity-40 
                     font-poppins w-full inset-0 md:text-sm text-[10px] font-light"
                    onMouseLeave={() => setIsClicked(null)}
                  >
                    <h1 className=" bg-opacity-15 text-center my-1">
                      Select Size
                    </h1>
                    <div className="grid grid-cols-3 gap-x-0.5 md:gap-x-2 gap-y-1.5 px-2">
                      {['M', 'L', 'XL', '2XL', '3XL'].map((size) => (
                        <button key={size}
                          className={` py-2.5 ${
                            selectedSize === size
                              ? "bg-indigo-500 text-white"
                              : "bg-gray-200 text-black"
                          } backdrop-blur rounded`}
                          onClick={() => setSelectedSize(size)}>
                          {size}
                        </button>
                      ))}
                    </div>
                    <button className={`mt-4 px-2 py-1.5 md:text-sm text-[10px] 
                      ${selectedSize
                          ? "bg-black text-white"
                          : "bg-neutral-300"
                      } justify-center w-4/5 flex mx-auto rounded`}
                      onClick={() => handleSize(item)}
                      disabled={!selectedSize}
                    >
                      ADD TO CART
                    </button>
                  </div>
                )}
            </div>
          </div>
          </div>
        )
      })
    }
  </div>
  )
}

export default ProductReusable
