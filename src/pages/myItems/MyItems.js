import React from "react";
import texts from "../../utils/Texts";
import { useLanguage } from "../../context/LanguageContext";
import FilterBox from "../../components/filterBox/FilterBox";
import ProductItem from "../../components/productItem/ProductItem";
import "./MyItems.scss";
import Products from "../../components/products/Products";

const MyItems = ({ currencyChange, products, user }) => {
  const { language } = useLanguage();
  const text = texts[language] || texts.en;

  let myProducts = [];

  if (user) {
    myProducts = products.filter((product) => product.owner === user._id);
  }

  return (
    <div className="my_items page">
      {user ? (
        <>
          <h4 className="page_title">{text.myItems}</h4>
          <Products
            currencyChange={currencyChange}
            products={myProducts}
            myItems={true}
          />
        </>
      ) : (
        <h4 className="page_title">{text.pleaseLogin}</h4>
      )}
    </div>
  );
};

export default MyItems;
