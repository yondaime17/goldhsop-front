import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import texts from "../../utils/Texts";
import Select from "react-select";

import "./Categories.scss";

const Categories = ({ lightTheme }) => {
  const { language } = useLanguage();
  const text = texts[language] || texts.ka;

  const options = [
    { label: `${text.crosses}`, value: `${text.crosses}` },
    { label: `${text.rings}`, value: `${text.rings}` },
    { label: `${text.bracelets}`, value: `${text.bracelets}` },
    { label: `${text.earings}`, value: `${text.earings}` },
    { label: `${text.chains}`, value: `${text.chains}` },
    { label: `${text.watches}`, value: `${text.watches}` },
    { label: `${text.coins}`, value: `${text.coins}` },
    { label: `${text.other}`, value: `${text.other}` }
  ];

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: lightTheme ? "2px solid #333" : "2px solid #a2a9b3",
      borderRadius: 10,
      backgroundColor: lightTheme ? "transparent" : "transparent",
      paddingLeft: 10,
      boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px"
    }),
    placeholder: (provided) => ({
      ...provided,
      color: lightTheme ? "333" : "white"
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      backgroundColor: lightTheme ? "#a2a9b3" : "#e67e22",
      color: "black",
      borderRadius: "0 5px 5px 0",
      ":hover": {
        backgroundColor: "transparent",
        color: "white"
      }
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#ccc" : "ccc",
      color: lightTheme ? "black" : "white",
      cursor: "pointer",
      ":hover": {
        backgroundColor: !lightTheme ? "#e67e22" : "#333",
        color: "white"
      }
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: lightTheme ? "#a2a9b3" : "#e67e22"
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "black"
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: 5,
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
      backgroundColor: lightTheme ? "#f3f3f3" : "#333"
    })
  };

  const handleChange = (selectedOptions) => {
    // Handle the selected options
    console.log("Selected Options:", selectedOptions);
  };

  return (
    <div className="categories">
      <h6>აირჩიეთ კატეგორია</h6>
      <Select
        options={options}
        styles={customStyles}
        isMulti
        onChange={handleChange}
        placeholder="კატეგორიები..."
      />
    </div>
  );
};

export default Categories;
