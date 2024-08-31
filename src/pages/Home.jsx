import React from "react";
import { menItems, womenItems } from "../utils/Products";
import ProductReusable from "../Reusables/ProductReusable";

const Home = () => {
  return (
    <div className="container font-poppins font-[500] text-[1rem] ">
      <div className=" flex">
        <img
          src="https://marketplace.canva.com/EAFG6srv-fI/1/0/1131w/canva-white-and-red-clean-minimalist-fashion-magazine-cover-GYbcb8zmyTU.jpg"
          alt="desc"
          className=" h-[30rem] w-[19rem] lg:block hidden rounded-bl-[2rem]"
        />
        <ProductReusable data={womenItems} />
      </div>
      <div className=" flex mt-10">
        <ProductReusable data={menItems} />
        <img
          src="https://th.bing.com/th/id/OIP.B9y2WsVb4oYfCrAjyjl7IwAAAA?rs=1&pid=ImgDetMain"
          alt="desc"
          className=" h-[30rem] w-[19rem] lg:block hidden rounded-tr-[2rem]"
        />
      </div>
    </div>
  );
};

export default Home;
