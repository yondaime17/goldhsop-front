import React, { useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import texts from "../../utils/Texts";
import "./WeightChooser.scss";

export default function WeightChooser({ setWeight }) {
  const { language } = useLanguage();
  const text = texts[language] || texts.en;

  const [minWeight, setMinWeight] = useState("");
  const [maxWeight, setMaxWeight] = useState("");

  function validateNumericInput(value) {
    return value.replace(/\D/g, "");
  }

  useEffect(() => {
    setWeight([
      parseInt(minWeight, 10) || 0,
      parseInt(maxWeight, 10) || null
    ]);
  }, [minWeight, maxWeight]);

  return (
    <div className="weight_chooser">
      <h5 className="title">{text.weight}</h5>
      <div className="input_choosers">
        <div className="min">
          <input
            type="number"
            placeholder={`${text.minWeight}`}
            value={minWeight}
            onChange={(e) => setMinWeight(validateNumericInput(e.target.value))}
          />
        </div>
        <div className="max">
          <input
            type="number"
            placeholder={`${text.maxWeight}`}
            value={maxWeight}
            onChange={(e) => setMaxWeight(validateNumericInput(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
}
