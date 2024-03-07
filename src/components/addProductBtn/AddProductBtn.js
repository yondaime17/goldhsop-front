import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import { MdAdd } from "react-icons/md";
import "./AddProductBtn.scss";

const AddProductBtn = ({ text }) => {
  const { lightTheme } = useTheme();
  const { language } = useLanguage();

  return (
    <button className="add_product_btn">
      <Link to={`/${language}/add_product`} className="link">
        <span>
          <MdAdd color={!lightTheme ? "white" : "white"} size="22px" />
        </span>
        <p>{text.add}</p>
      </Link>
    </button>
  );
};

export default AddProductBtn;
