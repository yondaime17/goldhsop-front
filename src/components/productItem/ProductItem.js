import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import Cookies from "js-cookie";

import texts from "../../utils/Texts";
import { useLanguage } from "../../context/LanguageContext";

import AddToWishlist from "../addToWishlist/AddToWishlist";

import "./ProductItem.scss";

export default function ProductItem({
  product,
  currencyChange,
  wishlist,
  setWishlist,
}) {
  const { language } = useLanguage();
  const text = texts[language] || texts.en;

  const [rate, setRate] = useState(2.66);

  const [hovered, setHovered] = useState(false);

  const selectedCurrency = Cookies.get("selectedCurrency");

  const [priceInSelectedCurrency, setPriceInSelectedCurrency] = useState("gel");

  useEffect(() => {
    if (selectedCurrency === "GEL") {
      setPriceInSelectedCurrency(product.price.toLocaleString() + " ₾");
    } else {
      setPriceInSelectedCurrency(
        "$" + Math.floor(product.price / rate).toLocaleString()
      );
    }
  }, [selectedCurrency, rate, product.price, currencyChange]);

  return (
    <>
      {!hovered ? (
        <div className="product_item" onMouseOver={() => setHovered(true)}>
          <img
            src={product.images[0].url}
            alt={product.title + "Shopgold.ge"}
          />
          <div className="product_description">
            <div className="parameters">
              <div className="prob">
                <h6>
                  {product.probe} {text.probe}
                </h6>
              </div>
              <div className="weight">
                <h6>
                  {product.weight} {text.gram}
                </h6>
              </div>
            </div>
            <h4>{product.title}</h4>
            <img
              className="divider"
              src="https://mirora-theme.myshopify.com/cdn/shop/t/16/assets/line.png?v=36933699607777210451662656065"
              alt="Goldshop"
            />
            <div className="price">
              {priceInSelectedCurrency && <p>{priceInSelectedCurrency}</p>}
            </div>
          </div>
        </div>
      ) : (
        <div
          className="product_item product_item_hovered"
          onMouseLeave={() => setHovered(false)}
        >
          <img
            src={
              product.images.length > 1
                ? product.images[1].url
                : product.images[0].url
            }
            alt={product.title + "Shopgold.ge"}
          />
          <div className="product_description">
            <div className="parameters">
              <div className="prob">
                <h6>
                  {product.probe} {text.probe}
                </h6>
              </div>
              <div className="weight">
                <h6>
                  {product.weight} {text.gram}
                </h6>
              </div>
            </div>
            <h4>{product.title}</h4>
            <img
              className="divider"
              src="https://mirora-theme.myshopify.com/cdn/shop/t/16/assets/line.png?v=36933699607777210451662656065"
              alt="Goldshop"
            />
          </div>
          <div className="product_actions">
            <AddToWishlist
              wishlist={wishlist}
              setWishlist={setWishlist}
              product={product}
            />
            <Link
              to={`/${language}/item/${product._id}`}
              className="see_product link"
            >
              {text.view}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
