import { useState } from "react";

import texts from "../../utils/Texts";
import { useLanguage } from "../../context/LanguageContext";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import ArrowIcon from "../arrowIcon/ArrowIcon";

import "./CategoryDropdown.scss";

const CategoryDropdown = ({ setCategory, category }) => {
  const { language } = useLanguage();
  const text = texts[language] || texts.ka;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChoose = (categoryItem) => {
    setCategory(categoryItem);
    handleClose();
  };

  const categories = [
    "crosses",
    "rings",
    "bracelets",
    "earings",
    "chains",
    "watches",
    "coins",
    "other",
  ];

  return (
    <>
      <button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="category_btn"
      >
        <h6 className="chosen_category">{text[category]}</h6>
        <ArrowIcon />
      </button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: "200px",
            right: "0",
            maxWidth: "none",
          },
        }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {categories.map((categoryItem) => {
          return (
            <MenuItem onClick={() => handleChoose(categoryItem)}>
              <span>{text[categoryItem]}</span>
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export default CategoryDropdown
