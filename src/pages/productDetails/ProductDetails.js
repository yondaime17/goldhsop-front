import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Cookies from "js-cookie";
import texts from "../../utils/Texts";
import { useLanguage } from "../../context/LanguageContext";
import AddToWishlist from "../../components/addToWishlist/AddToWishlist";

import "./ProductDetails.scss";

const ProductDetails = ({ currencyChange, wishlist, setWishlist }) => {
  const { language } = useLanguage();
  const text = texts[language] || texts.ka;
  const { id } = useParams();

  const selectedCurrency = Cookies.get("selectedCurrency");

  const [product, setProduct] = useState(null);
  const [priceInSelectedCurrency, setPriceInSelectedCurrency] = useState(null);
  const [rate, setRate] = useState(2.66);
  const [selectedCover, setSelectedCover] = useState(null); 
  const [owner, setOwner] = useState("");
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/items/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const productData = await response.json();
        setProduct(productData);
        setSelectedCover(productData.images[0].url);
  
        // Call getOwnerInfo only if productData is truthy
        productData && getOwnerInfo(productData.owner);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
  
    const getOwnerInfo = async (ownerId) => {
      console.log(ownerId, "owner id")
      try {
        const response = await fetch(`http://localhost:3000/api/users/${ownerId}/profile`);
        if (!response.ok) {
          throw new Error("Failed to fetch owner information");
        }
        const ownerData = await response.json();
        setOwner(ownerData.user);
      } catch (error) {
        console.error("Error fetching owner information:", error);
      }
    };
  
    fetchProduct();
  }, [id]);
  

  useEffect(() => {
    if (product) {
      if (selectedCurrency === "GEL") {
        setPriceInSelectedCurrency(product.price.toLocaleString() + " ₾");
      } else {
        setPriceInSelectedCurrency(
          "$" + Math.floor(product.price / rate).toLocaleString()
        );
      }
    }
  }, [selectedCurrency, rate, currencyChange, product]);

 
  const handlePreviewClick = (imageUrl) => {
    setSelectedCover(imageUrl); 
  };

  return (
    <div className="product_details_page page">
      {product && (
        <div className="product_details">
          <div className="product_images">
          
            <div className="product_cover">
              <img className="thumbnail" src={selectedCover} alt="GoldShop" />
              <div className="product_actions">
              <AddToWishlist
                wishlist={wishlist}
                setWishlist={setWishlist}
                product={product}
              />
            </div>
            </div>
            <div className="product_previews">
              {product.images.map((img, index) => (
                <button key={index} onClick={() => handlePreviewClick(img.url)}>
                  <img alt={product.title} src={img.url} />
                </button>
              ))}
            </div>
            
          </div>
          <div className="product_description">
            <div className="product_title">
              <h4>{product.title}</h4>
            </div>
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

            <h4>{product.name}</h4>
            <p className="description">{product.description}</p>

            <div className="price">
              <p>{priceInSelectedCurrency}</p>
            </div>
            <div className="product_owner">
             <Link className="link" to={`/${owner.username}`}><h5>{owner.username}</h5></Link>
              <p>{owner.mobilePhone}</p>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
