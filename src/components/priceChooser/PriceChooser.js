import React, { useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import texts from "../../utils/Texts";
import "./PriceChooser.scss";

export default function PriceChooser({ setPrice }) {
  const { language } = useLanguage();
  const text = texts[language] || texts.en;

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  function validateNumericInput(value) {
    return value.replace(/\D/g, "");
  }

  useEffect(() => {
    setPrice([parseInt(minPrice, 10) || 0, parseInt(maxPrice, 10) || null]);
  }, [minPrice, maxPrice]);

  return (
    <div className="price_chooser">
      <h5 className="title">{text.price}</h5>
      <div className="input_choosers">
        <div className="min">
          <input
            type="number"
            placeholder={`${text.minPrice}`}
            value={minPrice}
            onChange={(e) => setMinPrice(validateNumericInput(e.target.value))}
          />
        </div>
        <div className="max">
          <input
            type="number"
            placeholder={`${text.maxPrice}`}
            value={maxPrice}
            onChange={(e) => setMaxPrice(validateNumericInput(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
}
