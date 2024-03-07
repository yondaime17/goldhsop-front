import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";

import Products from "../../components/products/Products";
import FilterBox from "../../components/filterBox/FilterBox";
import Navbar from "../../components/navbar/Navbar";

import texts from "../../utils/Texts";

import "./CategoryPage.scss";

export default function CategoryPage({ lightTheme, changeTheme, categories }) {
  const { changeLanguage, language } = useLanguage();
  const { language: languageURL } = useParams();

  const text = texts[language] || texts.ka;

  useEffect(() => {
    changeLanguage(languageURL);
  }, [languageURL]);

  return (
    <div className="category_page page">
      <Navbar lightTheme={lightTheme} changeTheme={changeTheme} />
      <div className="layout">
        <div className="main_block">
          <Products />
        </div>
        <div className="right_block">
          <h3>
            <strong>{text.goldshop}</strong>
          </h3>
          <FilterBox lightTheme={lightTheme} categories={categories} />
        </div>
      </div>
    </div>
  );
}
