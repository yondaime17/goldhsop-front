import React from "react";
import "./SocialIcons.scss";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FiYoutube } from "react-icons/fi";

const SocialIcons = ({ whiteColor }) => {
  return (
    <div className="social_icons">
      <button className="social_icon">
        <FaFacebookF size="14px" color={whiteColor ? "white" : "#616161"} />
      </button>
      <button className="social_icon">
        <FaInstagram size="14px" color={whiteColor ? "white" : "#616161"} />
      </button>
      <button className="social_icon">
        <FiYoutube size="16px" color={whiteColor ? "white" : "#616161"} />
      </button>
    </div>
  );
};

export default SocialIcons;
