import { useLanguage } from "../../context/LanguageContext";
import texts from "../../utils/Texts";
import ProductItem from "../productItem/ProductItem";
import { useEffect, useState } from "react";
import "./Products.scss";
import FilterBox from "../filterBox/FilterBox";

export default function Products({
  products,
  currencyChange,
  myItems,
  myProfile,
  wishlist,
  setWishlist,
  parent,
  seller,
  searched,
}) {
  const { language } = useLanguage();
  const text = texts[language] || texts.en;

  return (
    <div className="products">
      <div className="products_box">
        <div className="product_heading">
          {myItems || parent==="wishlist" ? null : <h3>ნივთები</h3>}
         {parent === "wishlist" ? null : <FilterBox seller={seller} searched={searched}/>}
        </div>

        <div className="items">
          {products && products.length > 0
            ? products.map((product) => {
                return (
                  <ProductItem
                    key={product._id}
                    product={product}
                    currencyChange={currencyChange}
                    myProfile={myProfile}
                    wishlist={wishlist}
                    setWishlist={setWishlist}
                  />
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
}
