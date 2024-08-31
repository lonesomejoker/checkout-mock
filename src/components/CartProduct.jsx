import React, { useContext } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { FiDelete } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQty,
  incrementQty,
  removeItem,
} from "../app/slices/CartSlice";
import { LayoutContext } from "../layout/UserLayout";
import { useNavigate } from "react-router-dom";

const CartProduct = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cartslice);
  const { subTotal,onClose } = useContext(LayoutContext);
  const navigate=useNavigate();

  const handleCheckout=()=>{
    navigate("/paymentprocedure")
    onClose();
  }
  const handleIncQuantity = (itemId, quantity) => {
    if (quantity < 11) {
      dispatch(incrementQty(itemId));
    }
  };
  const handleDecQuantity = (itemId, quantity) => {
    if (quantity > 1) {
      // Validate quantity not to go below one
      dispatch(decrementQty(itemId));
    }
  };
  return (
    <div>
      {cart.length > 0 ? (
        <div className=" space-y-3 mx-auto ">
          {cart.map((item) => {
            return (
              <div
                className=" font-poppins border-b-2 border-violet-600 py-2"
                key={item.id}
              >
                <section className=" flex w-full gap-x-2.5 lg:items-center relative">
                  <img
                    src={item.image}
                    className=" h-16 md:h-28 rounded-xl w-16 lg:w-28"
                  />
                  <section>
                    <h1 className=" font-semibold line-clamp-2 text-sm lg:text-[1.2rem]">
                      {item.name}
                    </h1>
                    <h1 className=" text-violet-600 text-[13px] lg:text-[1.1rem] font-[500]">
                      Price: {item.price * item.quantity} Rs
                    </h1>
                    <ul className=" list-disc ml-2.5 lg:ml-5 text-zinc-700 text-[13px] lg:text-lg">
                      <li>category: {item.category}</li>
                      <li>size: {item.size}</li>
                    </ul>
                  </section>
                  <FiDelete
                    className=" absolute top-0 right-0"
                    size={28}
                    color="red"
                    onClick={() => dispatch(removeItem(item.id))}
                  />
                </section>

                <div className=" flex items-center justify-between gap-x-3 mt-1.5 font-semibold">
                  <h1 className=" text-violet-600 text-[1rem]">
                    Quantity: 
                  </h1>
                  <section className=" ml-2 flex items-center gap-x-2">
                    <FaMinus
                      className=" ring-2 ring-gray-400 px-[6.7px] text-[1.5rem] rounded-full"
                     
                      onClick={() => handleDecQuantity(item.id, item.quantity)}
                    />
                    <h2 className=" text-[1rem] md:text-[1.4rem]">{item.quantity}</h2>
                    <FaPlus
                      className=" ring-2 ring-emerald-400 px-[6.7px] text-[1.5rem] rounded-full"
                     
                      onClick={() => handleIncQuantity(item.id, item.quantity)}
                    />
                  </section>
                </div>
              </div>
            );
          })}
          <section className=" flex justify-between font-semibold text-[16px] lg:text-lg">
            <h1>SUB TOTAL: </h1>
            <h2 className=" text-violet-600">{subTotal}Rs</h2>
          </section>
          <button className=" hover:translate-y-2 duration-300 bg-violet-600 px-3 py-2 text-white w-full " onClick={handleCheckout}>
            CHECK OUT
          </button>
        </div>
      ) : (
        <p className=" font-poppins text-[16px] font-medium text-violet-600">
          No any Items in the Cart...<br/>
          Hover/Click over Product Images to open Add to Cart
        </p>
      )}
    </div>
  );
};

export default CartProduct;
