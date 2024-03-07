import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";

import AddItemForm from "../../components/AddItemForm/AddItemForm";

import texts from "../../utils/Texts";

import "./AddProduct.scss";

export default function AddProduct({
  lightTheme,
  changeTheme,
  categories,
  isToken,
  user,
}) {
  const { changeLanguage, language } = useLanguage();
  const { language: languageURL } = useParams();

  const text = texts[language] || texts.ka;

  useEffect(() => {
    changeLanguage(languageURL);
  }, [languageURL]);

  return (
    <div className="add_product_page page">
      <div className="add_item_container">
        {!isToken ? (
          <p className="please_login_message">{text.pleaseLogin}</p>
        ) : (
          <AddItemForm user={user} />
        )}
      </div>
    </div>
  );
}
