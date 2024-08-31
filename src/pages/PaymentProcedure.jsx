import React, { useEffect, useState } from "react";
import { message, notification, Steps } from "antd";
import Shipping from "./Shipping";
import PaymentInfo from "./PaymentInfo";
import OrderSummary from "./OrderSummary";
import CustomButton from "../Reusables/CustomButton";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PaymentProcedure = () => {
  const [current, setCurrent] = useState(0);
  const { cart } = useSelector((state) => state.cartslice);
  const navigate = useNavigate();
  const next = () => {
    setCurrent((prevCurrent) => {
      const newCurrent = prevCurrent + 1;
      localStorage.setItem("currentStep", newCurrent);
      return newCurrent;
    });
  };

  const prev = () => {
    setCurrent((prevCurrent) => {
      const newCurrent = prevCurrent - 1;
      localStorage.setItem("currentStep", newCurrent);
      return newCurrent;
    });
  };
  useEffect(() => {
    const savedStep = localStorage.getItem("currentStep");
    if (savedStep) {
      setCurrent(parseInt(savedStep, 10));
    }
  }, []);

  const steps = [
    {
      title: "Shipping",
      content: <Shipping next={next} />,
    },
    {
      title: "Payment",
      content: <PaymentInfo next={next} prev={prev} />,
    },
    {
      title: "Review",
      content: <OrderSummary prev={prev} />,
    },
  ];

  const handleDone = () => {
    message.success(
      <h1 className=" font-poppins font-semibold">Order Received</h1>
    );
    navigate("/");
    localStorage.removeItem("currentStep");
    setCurrent(0);
  };
  const handleCancel = () => {
    message.error(
      <h1 className=" font-poppins font-semibold">Order Cancelled</h1>
    );
    navigate("/");
    localStorage.removeItem("currentStep");
    setCurrent(0);
  };

  const handleMsg = () => {
    message.error(
      <p className=" font-poppins">Add items in the cart to proceed</p>
    );
    navigate("/");
  };

  return (
    <div
      className=" bg-cover bg-no-repeat bg-center h-screen"
      style={{
        backgroundImage:
          "url('https://wallpaperbat.com/img/174021-grey-geometric-abstract-backgroundfor-website-wallpaper-bussines.jpg')",
      }}
    >
      <header className="bg-neutral-800 py-2 text-white font-poppins w-full text-[1rem] lg:text-[1.3rem] font-[500] fixed z-50">
        <section className="flex justify-between container items-center">
          <h1>SysǪube</h1>
          <h1>Order Process</h1>
        </section>
      </header>
      <div className=" pt-[5rem] lg:pt-[7.2rem] container ">
        <Steps
          current={current}
          className=" w-full lg:w-[72%] container mx-auto font-poppins font-[600]"
        >
          {steps.map((item) => (
            <Steps.Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="lg:mt-[15px]">{steps[current].content}</div>
      </div>
      {current === steps.length - 1 && (
        <>
          <div className="hidden mt-[6px] mx-auto lg:w-[30%] gap-x-3 sticky bottom-0 font-poppins md:flex items-center">
            <CustomButton color={"bg-yellow-500"} onClick={handleCancel}>
              Cancel Order
            </CustomButton>
            {cart.length === 0 ? (
              <CustomButton color={"bg-red-600"} onClick={handleMsg}>
                Cart is empty
              </CustomButton>
            ) : (
              <CustomButton color={"bg-violet-600"} onClick={handleDone}>
                Place Order
              </CustomButton>
            )}
          </div>
          <div className="bg-white  py-3 font-light text-white px-3 md:hidden mt-[6px] mx-auto lg:w-[30%] gap-x-1.5 sticky bottom-0 font-poppins flex items-center">
            <button
              onClick={handleCancel}
              className=" py-2.5 bg-yellow-400 flex-1 rounded-[4px]"
            >
              Cancel Order
            </button>
            {cart.length === 0 ? (
              <button
                className="py-2.5 bg-violet-600 flex-1 rounded-[4px] "
                onClick={handleMsg}
              >
                Cart is empty
              </button>
            ) : (
              <button
                color={"bg-violet-600"}
                className=" py-2.5 bg-violet-500 flex-1 rounded-[4px]"
                onClick={handleDone}
              >
                Place Order
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentProcedure;
