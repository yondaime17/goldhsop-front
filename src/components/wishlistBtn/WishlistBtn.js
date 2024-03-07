import React from "react";
import "./WishlistBtn.scss";
import { FaRegHeart } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";

const WishlistBtn = () => {
  const { lightTheme } = useTheme();
  return (
    <button className="favourites_btn">
      {!lightTheme ? (
        <FaRegHeart size="24px" color="white" />
      ) : (
        <FaRegHeart size="24px" color="#1b1b1b" />
      )}
    </button>
  );
};

export default WishlistBtn;
