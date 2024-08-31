import React from "react";
import { useSelector } from "react-redux";
import CustomButton from "../Reusables/CustomButton";

const OrderSummary = ({ prev }) => {
  const { cart } = useSelector((state) => state.cartslice);
  const { details } = useSelector((state) => state.shippingslice);
  const { paydetails } = useSelector((state) => state.paymentslice);

  const subTotal = cart.reduce((prev, item) => {
    return prev + item.price * item.quantity;
  }, 0);

  const shippingCost = 1000;
  const vatAdded = (13 / 100) * subTotal + subTotal;

  const maskNumber = (number) => {
    if (!number) return "";
    const length = number.length;
    return length > 3 ? "*".repeat(length - 3) + number.slice(-3) : number;
  };

  return (
    <div className="font-poppins w-full lg:w-[70%] mx-auto">
      <div className=" text-lg py-2 lg:py-5 px-2 rounded-[15px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-white/30 backdrop-blur-md shadow-lg shadow-neutral-700 gap-y-5">
        <div className=" space-y-2 flex-1 font-medium px-3 md:col-span-2">
          <h1 className=" mb-1.5 md:mb-3 font-bold text-[18px] ">
            Order Details
          </h1>
          {cart?.map((item, idx) => {
            return (
              <div
                key={idx}
                className=" flex items-center gap-x-2 border-b-2 border-dashed pb-1.5 border-gray-300"
              >
                <img
                  src={item.image}
                  className=" h-[6.6rem] w-[6.3rem] rounded-lg"
                />
                <section>
                  <h1>{item.name}</h1>
                  <h2>
                    Price: {item.price}
                    <span className="text-sm">Rs</span>{" "}
                  </h2>
                  <h2>Quantity: {item.quantity}</h2>
                </section>
              </div>
            );
          })}
          <section>
            <h3>
              SubTotal:{" "}
              <span className=" text-violet-600">
                {subTotal}
                <span className="text-sm">Rs</span>{" "}
              </span>
            </h3>
            <h3>
              VAT added(13%):{" "}
              <span className=" text-violet-600">
                {vatAdded}
                <span className="text-sm">Rs</span>{" "}
              </span>
            </h3>
            <h3>
              Shipping Cost:{" "}
              <span className=" text-violet-600">
                {" "}
                {shippingCost}
                <span className="text-sm">Rs</span>{" "}
              </span>
            </h3>
            <h3 className=" border-b-[3px] pb-1  border-violet-700 font-semibold">
              Total:
              <span className=" text-violet-600">
                {vatAdded + shippingCost}
              </span>
              <span className=" text-violet-600 text-sm">Rs</span>
            </h3>
          </section>
        </div>
        <div className=" lg:border-r-2 border-dashed border-gray-300 lg:border-l-2 lg:pl-3 text-[16px] flex-1 space-y-1 px-3">
          <h1 className=" mb-1.5 md:mb-3 text-[18px] font-semibold">
            Shipping Info
          </h1>
          <h1>
            <span className=" font-semibold">Customer Name:</span>
            {details.full_name}
          </h1>
          <h2>
            <span className=" font-semibold">Address:</span> {details.address}
          </h2>
          <h2>
            <span className=" font-semibold">City:</span> {details.city}
          </h2>
          <h2>
            <span className=" font-semibold">State:</span> {details.province}
          </h2>
          <h2>
            <span className=" font-semibold">Zip Code:</span> {details.zip_code}
          </h2>
          <h2>
            <span className=" font-semibold">Country:</span> {details.country}
          </h2>
          <h2 className=" border-b-[3px] pb-1 md:border-b-0 border-violet-700">
            <span className=" font-semibold">Details:</span>{" "}
            {details.phone_number}
          </h2>
        </div>
        <div className=" lg:pl-3 text-[16px] px-3">
          <h1 className=" mb-1.5 md:mb-3 font-bold">Card Details</h1>
          <h1>
            <span className=" font-semibold">Card holder: </span>
            {paydetails.holder_name}
          </h1>
          <h2>
            <span className=" font-semibold">Card number: </span>
            {maskNumber(paydetails.card_number)}
          </h2>
          <h2>
            <span className=" font-semibold">Expiry:</span>{" "}
            {paydetails.exp_date}
          </h2>
          <h2>
            <span className=" font-semibold">VCC: </span>{" "}
            {maskNumber(paydetails.validation_code)}
          </h2>
        </div>
      </div>
      <section className=" mt-1.5">
        <CustomButton color={"bg-yellow-400"} onClick={() => prev()}>
          Back to Payment Details
        </CustomButton>
      </section>
    </div>
  );
};

export default OrderSummary;
