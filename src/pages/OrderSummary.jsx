import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaArrowLeft, FaEdit, FaSave } from "react-icons/fa";
import CustomButton from "../Reusables/CustomButton";
import InputField from "../Reusables/InputField";
import { updateDetails } from "../app/slices/ShippingSlice";
import { paymentData } from "../app/slices/PaymentSlice";
import {
  decrementQty,
  incrementQty,
  removeItem,
} from "../app/slices/CartSlice";

const OrderSummary = ({ prev }) => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cartslice);
  const { details } = useSelector((state) => state.shippingslice);
  const { paydetails } = useSelector((state) => state.paymentslice);

  const [isDetailsEditable, setIsDetailsEditable] = useState(false);
  const [isPayDetailsEditable, setIsPayDetailsEditable] = useState(false);
  const [formDetails, setFormDetails] = useState(details);
  const [formPayDetails, setFormPayDetails] = useState(paydetails);
  const [errors, setErrors] = useState({});

  const subTotal = cart.reduce(
    (prev, item) => prev + item.price * item.quantity,
    0
  );
  const shippingCost = cart.length === 0 ? 0 : 1000;
  const vatAdded = (13 / 100) * subTotal ;

  const maskNumber = (number) =>
    number ? "*".repeat(number.length - 3) + number.slice(-3) : "";

  const handleDetailsChange = (e) => {
    setFormDetails({ ...formDetails, [e.target.name]: e.target.value });
  };

  const handlePayDetailsChange = (e) => {
    setFormPayDetails({ ...formPayDetails, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (isDetailsEditable) {
      dispatch(updateDetails(formDetails));
    }
    if (isPayDetailsEditable) dispatch(paymentData(formPayDetails));
    console.log("Saving Form Details:", details);
    setIsDetailsEditable(false);
    setIsPayDetailsEditable(false);
  };

  return (
    <div className="font-poppins w-full lg:w-[70%] mx-auto">
      <div className="text-lg py-2 lg:py-5 px-2 rounded-[15px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-white/30 backdrop-blur-md shadow-lg shadow-neutral-700 gap-y-5">
        <div className="space-y-2 flex-1 font-medium px-3 md:col-span-2">
          <h1 className="mb-1.5 md:mb-3 font-bold text-[18px]">
            Order Details
          </h1>
          {cart?.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start justify-between gap-x-2 border-b-2 border-dashed pb-1.5 border-gray-300"
            >
              <div className="flex gap-x-1.5 items-start leading-none lg:leading-tight">
                <img
                  src={item.image}
                  className="h-[6.6rem] w-[6.3rem] rounded-lg"
                  alt="pp"
                />
                <div className="h-[6.6rem] flex flex-col justify-between">
                  <section className=" space-y-1.5">
                    <h1 className=" text-semibold">{item.name}</h1>
                    <h2 className="text-violet-500 flex items-center gap-x-0.5">
                      {item.price}
                      <span className="text-sm">Rs</span>
                    </h2>
                  </section>
                  <h2
                    className=" text-violet-600 text-[17px] font-semibold"
                    onClick={() => dispatch(removeItem(item.id))}
                  >
                    REMOVE
                  </h2>
                </div>
              </div>
              <section>
                <h2 className=" space-x-2 font-semibold flex">
                  <span
                    className="rounded-full ring-2 ring-gray-300 px-[8.2px] mr-2"
                    onClick={() => dispatch(decrementQty(item.id))}
                  >
                    -
                  </span>{" "}
                  {item.quantity}
                  <span
                    className="ml-2 rounded-full ring-2 ring-emerald-400 px-[7.4px]"
                    onClick={() => dispatch(incrementQty(item.id))}
                  >
                    +
                  </span>
                </h2>
              </section>
            </div>
          ))}
          <section>
            <h3 className="flex justify-between">
              SubTotal:{" "}
              <span className="text-violet-600">
                {subTotal}
                <span className="text-sm">Rs</span>
              </span>
            </h3>
            <h3 className="flex justify-between">
              VAT (13%):{" "}
              <span className="text-violet-600">
                {vatAdded}
                <span className="text-sm">Rs</span>
              </span>
            </h3>
            <h3 className="flex justify-between">
              Shipping Cost:{" "}
              <span className="text-violet-600">{shippingCost}Rs</span>
            </h3>
            <h3 className="border-b-[3px] pb-1 border-violet-700 font-semibold flex justify-between ">
              Total:{" "}
              <span className="text-violet-600">{vatAdded + shippingCost+subTotal}Rs</span>
            </h3>
          </section>
        </div>

        <div className="lg:border-r-2 border-dashed border-gray-300 lg:border-l-2 lg:pl-3 text-[16px] flex-1 space-y-1 px-3">
          <div className="flex justify-between items-start">
            <h1 className="mb-1.5 md:mb-3 text-[18px] font-semibold">
              Shipping Info
            </h1>
            <FaEdit
              onClick={() => setIsDetailsEditable(!isDetailsEditable)}
              className="cursor-pointer text-violet-600"
            />
          </div>
          {isDetailsEditable ? (
            <>
              <InputField
                type="text"
                name="full_name"
                value={formDetails.full_name}
                onChange={handleDetailsChange}
                error={errors.full_name}
                placeholder="Full Name"
                required
              />
              <InputField
                type="number"
                name="phone_number"
                value={formDetails.phone_number}
                onChange={handleDetailsChange}
                placeholder="Number"
                required
              />
              <InputField
                type="text"
                name="address"
                value={formDetails.address}
                onChange={handleDetailsChange}
                placeholder="Address"
                required
              />
              <InputField
                type="text"
                name="city"
                value={formDetails.city}
                onChange={handleDetailsChange}
                placeholder="City"
                required
              />
              <InputField
                type="text"
                name="province"
                value={formDetails.province}
                onChange={handleDetailsChange}
                placeholder="State"
                required
              />
              <InputField
                type="number"
                name="zip_code"
                value={formDetails.zip_code}
                onChange={handleDetailsChange}
                placeholder="Zip Code"
                required
              />
              <InputField
                type="text"
                name="country"
                value={formDetails.country}
                onChange={handleDetailsChange}
                placeholder="Country"
                required
              />
            </>
          ) : (
            <>
              <h1 className="flex justify-between md:block">
                <span className="font-semibold">Customer Name:</span>{" "}
                {details.full_name}
              </h1>
              <h1 className="flex justify-between md:block">
                <span className="font-semibold">Number:</span>{" "}
                {details.phone_number}
              </h1>
              <h2 className="flex justify-between md:block">
                <span className="font-semibold">Address:</span>{" "}
                {details.address}
              </h2>
              <h2 className="flex justify-between md:block">
                <span className="font-semibold">City:</span> {details.city}
              </h2>
              <h2 className="flex justify-between md:block">
                <span className="font-semibold">State:</span> {details.province}
              </h2>
              <h2 className="flex justify-between md:block">
                <span className="font-semibold">Zip Code:</span>{" "}
                {details.zip_code}
              </h2>
              <h2 className="flex justify-between md:block">
                <span className="font-semibold">Country:</span>{" "}
                {details.country}
              </h2>
            </>
          )}
        </div>

        <div className="lg:pl-3 text-[16px] px-3">
          <div className="flex justify-between items-start">
            <h1 className="mb-1.5 md:mb-3 font-bold">Card Details</h1>
            <FaEdit
              onClick={() => setIsPayDetailsEditable(!isPayDetailsEditable)}
              className="cursor-pointer text-violet-600"
            />
          </div>
          {isPayDetailsEditable ? (
            <>
              <InputField
                type="text"
                name="holder_name"
                value={formPayDetails.holder_name}
                onChange={handlePayDetailsChange}
                placeholder="Card Holder"
                required
              />
              <InputField
                type="number"
                name="card_number"
                value={formPayDetails.card_number}
                onChange={handlePayDetailsChange}
                required
                placeholder="Card Number"
              />
              <InputField
                type="date"
                name="exp_date"
                value={formPayDetails.exp_date}
                onChange={handlePayDetailsChange}
                required
                placeholder="Expiry Date"
              />
              <InputField
                type="number"
                name="validation_code"
                value={formPayDetails.validation_code}
                onChange={handlePayDetailsChange}
                required
                placeholder="VCC"
              />
            </>
          ) : (
            <>
              <h1 className="flex justify-between md:block">
                <span className="font-semibold">Card holder: </span>{" "}
                {paydetails.holder_name}
              </h1>
              <h2 className="flex justify-between md:block">
                <span className="font-semibold">Card number: </span>{" "}
                {maskNumber(paydetails.card_number)}
              </h2>
              <h2 className="flex justify-between md:block">
                <span className="font-semibold">Expiry:</span>{" "}
                {paydetails.exp_date}
              </h2>
              <h2 className="flex justify-between md:block">
                <span className="font-semibold">VCC: </span>{" "}
                {maskNumber(paydetails.validation_code)}
              </h2>
            </>
          )}
        </div>
      </div>
      <section className="mt-1.5">
        {isDetailsEditable || isPayDetailsEditable ? (
          <CustomButton onClick={handleSave} color={"bg-yellow-500"}>
            <span className=" flex items-center gap-x-1">
              <FaSave color="white" />
              Save
            </span>
          </CustomButton>
        ) : (
          <CustomButton onClick={() => prev()} color={"bg-green-400"}>
            <span className=" flex items-center gap-x-1">
              <FaArrowLeft color="white" />
              Back to Payment
            </span>
          </CustomButton>
        )}
      </section>
    </div>
  );
};

export default OrderSummary;
