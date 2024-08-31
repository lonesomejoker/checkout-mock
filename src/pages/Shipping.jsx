import React, { useState } from "react";
import { useGetAllCountriesQuery } from "../services/CountryApi";
import InputField from "../Reusables/InputField";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomButton from "../Reusables/CustomButton";
import { shippingInfo } from "../app/slices/ShippingSlice";

const Shipping = ({ next }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    full_name: "",
    phone_number: "",
    address: "",
    city: "",
    zip_code: "",
    province: "",
    country: "Nepal",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "zip_code") {
      // Allow only digits and ensure it's no more than 16 characters long
      if (/^\d{0,5}$/.test(value)) {
        setForm({ ...form, [name]: value });
      }
    }
    else if (name === "phone_number") {
      if (/^\d{0,10}$/.test(value)) {
        setForm({ ...form, [name]: value });
      }
    } 
    else{
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
    }
  };

  const [errors, setErrors] = useState({});
  
  const validate = () => {
    const tempErrors = {};

    if (form.full_name.length < 3) {
      tempErrors.full_name = "Full Name must be at least 3 characters long.";
    }

    if (!/^\d{10}$/.test(form.phone_number)) {
      tempErrors.phone_number = "Phone Number must be 10 digits.";
    }

    if (form.address.length < 4) {
      tempErrors.address = "Address must be at least 4 characters long.";
    }

    if (form.city.length < 2) {
      tempErrors.city = "City must be at least 2 characters long.";
    }

    if (!/^\d{5}$/.test(form.zip_code)) {
      tempErrors.zip_code = "ZIP Code must be exactly 5 digits.";
    }

    if (form.province.length < 4) {
      tempErrors.province = "Province must be at least 4 characters long.";
    }

    if (!form.country) {
      tempErrors.country = "Please select a country.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Dispatch formData to redux store
      dispatch(shippingInfo(form));
      next(); // Proceed to the next step
    }
  };

  //RTK Query hook to getCountriesList from API
  const { data, error, isLoading } = useGetAllCountriesQuery();

  if (isLoading) {
    return <h1 className="text-xl font-medium text-center">Loading...</h1>;
  }
  if (error) {
    return (
      <h1 className="text-xl font-medium text-center text-red-500">
        Error fetching countries. Please try again later.
      </h1>
    );
  }

  const countriesList = data?.map((item) => item.name.common) || [];

  return (
    <div className="font-poppins text-lg ">
      <div className=" mx-auto lg:flex bg-gradient-to-r from-violet-400 to-neutral-700 backdrop-blur-lg rounded-2xl shadow-lg shadow-neutral-700 p-3 lg:w-[70%] gap-x-3">
        <section className="flex flex-col gap-4 lg:w-[45%]">
          <h2 className=" text-[22px] font-semibold">Shipping Details</h2>
          <form onSubmit={handleSubmit} className=" space-y-4 px-2.5">
            <InputField
              type="text"
              placeholder="Enter your full name*"
              name="full_name"
              value={form.full_name}
              onChange={handleChange}
              error={errors.full_name}
              required
            />
            <InputField
              placeholder="Enter your phone num*"
              name="phone_number"
              value={form.phone_number}
              onChange={handleChange}
              error={errors.phone_number}
              required
            />
            <InputField
              type="text"
              placeholder="Enter your address*"
              name="address"
              value={form.address}
              onChange={handleChange}
              error={errors.address}
              required
            />
            <InputField
              type="text"
              placeholder="Enter your city*"
              name="city"
              value={form.city}
              onChange={handleChange}
              error={errors.city}
              required
            />
            <InputField
              type="text"
              placeholder="Enter your state/province*"
              name="province"
              value={form.province}
              onChange={handleChange}
              error={errors.province}
              required
            />
            <InputField
              placeholder="Enter your ZIP code*"
              name="zip_code"
              value={form.zip_code}
              onChange={handleChange}
              error={errors.zip_code}
              required
            />
            <InputField
              type="select"
              name="country"
              value={form.country}
              onChange={handleChange}
              options={countriesList}
              error={errors.country}
              required
            />
            <div className="flex gap-x-1.5 leading-none">
             
              <CustomButton
                type="button"
                onClick={() => navigate("/")}
                color={"bg-yellow-500"}
              >
                Back to Cart
              </CustomButton>
              <CustomButton type={"submit"} color={"bg-violet-700"}>
                Proceed to Payment
              </CustomButton>
            </div>
          </form>
        </section>
        <div className=" md:block hidden relative w-full flex-1 px-5 lg:px-12 py-6 lg:py-12 rounded-[15px] drop-shadow-md">
          <div
            className="absolute inset-0 bg-center bg-cover bg-no-repeat rounded-r-[15px] brightness-90"
            style={{
              backgroundImage: `url("https://cdn.dribbble.com/users/2317423/screenshots/14024494/fast_shipping_4x.jpg")`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Shipping;
