import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";

import geo from "../../media/img/icons/geo.svg";
import eng from "../../media/img/icons/eng.svg";

const LanguageChooser = () => {
  const { language, changeLanguage } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLanguageChange = (newLanguage) => {
    // Assuming changeLanguage and navigate functions are available in your code
    changeLanguage(newLanguage);

    // Get the current path from the location object
    const currentPath = location.pathname;

    // Remove the existing language parameter from the current path, if present
    const currentPathWithoutLanguage = currentPath.replace(/\/(ka|en)/, "");

    // Construct the new URL with the updated language and the current path
    const newPath = `/${newLanguage}${currentPathWithoutLanguage}`;

    // Navigate to the new URL
    navigate(newPath);
  };

  return (
    <div>
      {language === "en" ? (
        <button
          onClick={() => handleLanguageChange("ka")}
          disabled={language === "ka"}
        >
          <img alt="Georgia flag icon" src={geo} />
        </button>
      ) : (
        <button
          onClick={() => handleLanguageChange("en")}
          disabled={language === "en"}
        >
          <img alt="Great Britain flag icon" src={eng} />
        </button>
      )}
    </div>
  );
};

export default LanguageChooser;
