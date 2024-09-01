import React, { useState } from 'react'
import InputField from "../Reusables/InputField";
import CustomButton from '../Reusables/CustomButton';
import { useDispatch } from 'react-redux';
import { paymentData } from '../app/slices/PaymentSlice';

const PaymentInfo = ({next,prev}) => {
  const dispatch=useDispatch();  
  const[form,setForm]=useState(
    {
      holder_name: "",
      card_number: "",
      exp_date: "",
      validation_code: "",
    }
  );
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === "card_number") {
      // Allow only digits and ensure it's no more than 16 characters long
      if (/^\d{0,16}$/.test(value)) {
        setForm({ ...form, [name]: value });
      }
    } else if (name === "validation_code") {
      if (/^\d{0,5}$/.test(value)) {
        setForm({ ...form, [name]: value });
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };
  
  const [errors, setErrors] = useState({});
  const validate = () => {
    const tempErrors = {};

    if (form.holder_name.length < 5 || form.holder_name.length >20) {
      tempErrors.holder_name = 'Holder Name must be 5-20 characters long.';
    }

    if (!/^\d{16}$/.test(form.card_number)) {
      tempErrors.card_number = 'Card Number must be exactly 16 digits.';
    }

    if (!/^\d{5}$/.test(form.validation_code)) {
      tempErrors.validation_code = 'VCC must be 5 digits long.';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(paymentData(form));
      next(); 
    }
  };

  return (
    <div className=" font-poppins text-lg  ">
      <div className="lg:w-[70%]  mx-auto w-full md:flex bg-gradient-to-r from-violet-400 to-neutral-700 backdrop-blur-lg rounded-[15px] shadow-lg shadow-neutral-700 p-3">
        <section className="flex flex-col gap-1 lg:gap-4 lg:w-[40%]">
          <h2 className=" text-[22px] font-semibold">Provide Card Details </h2>
          <form className="space-y-4 px-2.5" onSubmit={handleSubmit}>
            <InputField type='text'
              placeholder="Cardholder Name *"
              name="holder_name"
              value={form.holder_name}
              onChange={handleChange}
              error={errors.holder_name}
              required
            />
            <InputField
              placeholder="Card Number *"
              type="text"
              name="card_number"
              value={form.card_number}
              onChange={handleChange}
              error={errors.card_number}
              required
            />
            <div className='text-lg mt-5'>
            <label htmlFor='date'>Expiration Date</label>
            <InputField id="date"
              placeholder="Date *"
              type="date"
              name="exp_date"
              value={form.exp_date}
              onChange={handleChange}
              error={errors.exp_date}
              required
            />
            </div>
            <InputField
              placeholder="C.V.V *"
              type="text"
              name="validation_code"
              value={form.validation_code}
              onChange={handleChange}
              error={errors.validation_code}
              required
            />

            <section className=" flex justify-between gap-x-2">
            <CustomButton onClick={() => prev()} color={"bg-yellow-500"}>
                Back to Shipping
              </CustomButton>
              <CustomButton type={"submit"} color={"bg-violet-700"} hoverColor={"bg-green-800"}>Proceed to Review</CustomButton>
              
            </section>
          </form>
        </section>
      
      <div className="md:block hidden relative w-full lg:flex-1 px-5 lg:px-12 py-6 lg:py-12 rounded-[15px] drop-shadow-md">
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat rounded-r-[15px] brightness-90"
          style={{
            backgroundImage: `url("https://th.bing.com/th/id/R.252dbe59d49078c175eedc5d58c365d7?rik=H%2fNmSlUKsFWDRw&pid=ImgRaw&r=0")`,
          }}
        />
      </div>
      </div>
    </div>
  )
}

export default PaymentInfo
