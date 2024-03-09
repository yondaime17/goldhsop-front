import React, { useState, useEffect } from "react";
import "./Hero.scss";

import texts from "../../utils/Texts";
import { useLanguage } from "../../context/LanguageContext";

const Hero = () => {

  const language = useLanguage();
  const text = texts[language] || texts.ka


  return (
    <div className="hero">
      <img
        src="https://res.cloudinary.com/dgyqivinq/image/upload/v1705410493/goldshop/srzisor9pwh2abgyfheh.jpg"
        alt="Shopgold.ge"
      />
      <div className="overlay">
        <h5>
          <strong>
            {text.goldshop}
          </strong>
        </h5>
      </div>
    </div>
  );
};

export default Hero;
