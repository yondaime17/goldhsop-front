import React, { useState, useEffect } from "react";
import "./Hero.scss";

const bannerData = [
  "https://res.cloudinary.com/dgyqivinq/image/upload/v1705410493/goldshop/j6uvardl40lvjoeppl3i.jpg",
  "https://res.cloudinary.com/dgyqivinq/image/upload/v1705410493/goldshop/srzisor9pwh2abgyfheh.jpg",
  // Add more image URLs as needed
];

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % bannerData.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [activeIndex]); // Adding activeIndex as a dependency

  return (
    <div className="hero">
      <img
        src="https://res.cloudinary.com/dgyqivinq/image/upload/v1705410493/goldshop/srzisor9pwh2abgyfheh.jpg"
        alt="Shopgold.ge"
      />
      <div className="overlay">
        <h5>
          <strong>
            ოქროს ნივთების <br /> ყიდვა / გაყიდვა
          </strong>
        </h5>
      </div>
    </div>
  );
};

export default Hero;
