import React from "react";
import Products from "../../components/products/Products";
import { useLanguage } from "../../context/LanguageContext";
import texts from "../../utils/Texts"
import "./Wishlist.scss";


const Wishlist = ({ wishlist, setWishlist }) => {
  const {language} = useLanguage();
  const text = texts[language] || text[ka]

   

  return (
    <div className="wishlist_page page">
      <h4 className="page_title">{text.wishlist}</h4>
      <Products products={wishlist} setWishlist={setWishlist} parent="wishlist"/>
    </div>
  );
};

export default Wishlist;
