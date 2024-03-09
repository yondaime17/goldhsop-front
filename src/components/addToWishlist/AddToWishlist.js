import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { FaRegHeart } from "react-icons/fa6";

import "./AddToWishlist.scss";

const AddToWishlist = ({ wishlist, setWishlist, product }) => {
  const { lightTheme } = useTheme();
  const [marked, setMarked ] = useState(false);

  const isInWishlist = wishlist && wishlist.some((item) => item._id === product._id);

  const toggleWishlist = () => {
    console.log(isInWishlist)
    console.log(wishlist)
    if (wishlist) {
      if (isInWishlist) {
        console.log("Removing from wishlist:", product);
        setWishlist((prevWishlist) =>
          prevWishlist.filter((item) => item._id !== product._id)
        );
      } else {
        console.log("Adding to wishlist:", product);
        setWishlist((prevWishlist) => [...prevWishlist, product]);
      }
    }
  };
  

  return (
    <button
      className={`add_to_wishlist${isInWishlist ? " in_wishlist" : ""}`}
      onMouseOver={() => setMarked(true)}
      onMouseLeave={() => setMarked(false)}
      onClick={toggleWishlist}
    >
      <FaRegHeart 
        size="18px"
        color={
          isInWishlist ? 
          "white" : 
          !marked
            ? lightTheme
              ? "#5a5a5a"
              : "#aaa"
            : lightTheme
            ? "white" : 
            "white"
            
        }
      />
    </button>
  );
};

export default AddToWishlist;
