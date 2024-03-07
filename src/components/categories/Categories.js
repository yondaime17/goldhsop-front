import React from "react";

import texts from "../../utils/Texts";
import { useLanguage } from "../../context/LanguageContext";

import MultiSelectCheckboxes from "../multiSelectCheckboxes/MultiSelectCheckboxes";

import "./Categories.scss";

const Categories = ({getData}) => {
  const { language } = useLanguage();
  const text = texts[language] || texts.ka;

  const categories = [
    "crosses",
    "rings",
    "bracelets",
    "earings",
    "chains",
    "watches",
    "coins",
    "other",
  ];

  const options = categories.map((category) => {
    return category;
  });

  return (
    <div className="categories">
      <h5 className="title">{text.category}</h5>
      <MultiSelectCheckboxes options={options} needsTranslation={true} getData={getData}/>
    </div>
  );
};

export default Categories;
