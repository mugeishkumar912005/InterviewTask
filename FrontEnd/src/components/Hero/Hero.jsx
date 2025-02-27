import React from "react";
import carPng from "../../assets/3 headlamps.gif";
import yellowCarPng from "../../assets/ybmw.png";

const Hero = ({ theme }) => {
  return (
    <div className="dark:bg-black dark:text-white duration-300 relative -z-1">
      <div className="container min-h-[620px] flex">
        <div
          className=" grid 
        place-items-center grid-cols-1 sm:grid-cols-2"
        >
          <div
            data-aos="zoom-in"
            data-aos-duration="1500"
            className="order-1 sm:order-2"
          >
            <img
              src={theme === "dark" ? carPng : yellowCarPng}
              alt=""
              className="relative -z-10 max-h-[600px] sm:scale125 
              drop-shadow-[2px_20px_6px_rgba(0,0,0,0.50)] h-100"
            />
          </div>
          <div className="order-2 sm:order-1 space-y-5 sm:pr-32 ml-8">
            <p
              data-aos="fade-up"
              data-aos-delay="600"
              className="text-primary text-2xl font-serif"
            >
              Effortless
            </p>
            <h1
              data-aos="fade-up"
              data-aos-delay="800"
              className="text-5xl lg:text-7xl font-semibold font-serif"
            >
              Car Rental
            </h1>
            <p data-aos="fade-up" data-aos-delay="1000">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum,
              fuga alias! Consectetur ab nihil eum itaque quas in!
            </p>
            <button
              data-aos="fade-up"
              data-aos-delay="1000"
              className="btn bg-primary text-black px-6 py-2 rounded-md hover:bg-primary/80 duration-300"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
