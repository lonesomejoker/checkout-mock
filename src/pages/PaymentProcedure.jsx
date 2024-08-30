import React, { useEffect, useState } from 'react';
import { message, Steps } from 'antd';
import Shipping from './Shipping';
import PaymentInfo from './PaymentInfo';
import { useDispatch } from 'react-redux';
import OrderSummary from './OrderSummary';
import CustomButton from '../Reusables/CustomButton';
import { useNavigate } from 'react-router-dom';

const PaymentProcedure = () => {
  const [current, setCurrent] = useState(0);
  const navigate=useNavigate();
  const next = () => {
    setCurrent((prevCurrent) => {
      const newCurrent = prevCurrent + 1;
      localStorage.setItem('currentStep', newCurrent);
      return newCurrent;
    });
  };

  const prev = () => {
    setCurrent((prevCurrent) => {
      const newCurrent = prevCurrent - 1;
      localStorage.setItem('currentStep', newCurrent);
      return newCurrent;
    });
  };
  useEffect(() => {
    const savedStep = localStorage.getItem('currentStep');
    if (savedStep) {
      setCurrent(parseInt(savedStep, 10));
    }
  }, []);

  const steps = [
    {
      title: 'Shipping',
      content: <Shipping next={next} />,
    },
    {
      title: 'Payment',
      content: <PaymentInfo next={next} prev={prev}/>,
    },
    {
      title: 'Review',
      content: <OrderSummary prev={prev}/>,
    },
  ];

  const handleDone=()=>{
    message.success('Order Recieved');
    navigate("/");
    localStorage.removeItem('currentStep');
    setCurrent(0);
  }

  return (
    <>
     <header className='bg-neutral-800 py-2 text-white font-poppins w-full text-[1.3rem] font-[500] fixed z-50'>
     <section className='flex justify-between container'>
      <h1>SysǪube</h1>
      <h1>Order Process</h1>
      </section>
     </header>
    <div className="container pt-[7.2rem]">
      <Steps current={current} className=' w-full lg:w-[70%] mx-auto font-poppins font-[600]'>
        {steps.map((item) => (
          <Steps.Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className='mt-[24px]'>
        {steps[current].content}
      </div>
      <div  className='mt-[6px] mx-auto lg:w-[70%] '>
        {current === steps.length - 1 && (
          <CustomButton color={"bg-green-500"} onClick={handleDone}>
            Place Order
          </CustomButton>
        )}
      </div>
    </div>
    </>
  );
};

export default PaymentProcedure;
