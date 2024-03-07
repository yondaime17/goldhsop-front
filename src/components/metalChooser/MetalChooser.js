import React, { useState } from "react";
import texts from "../../utils/Texts";
import { useLanguage } from "../../context/LanguageContext";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowIcon from "../arrowIcon/ArrowIcon";
import "./MetalChooser.scss";

const MetalChooser = ({ metal, setMetal }) => {
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

  const handleChoose = (metalItem) => {
    setMetal(metalItem);
    handleClose();
  };

  const metals = ["gold", "silver", "other"];

  return (
    <>
      <button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="metal_chooser_btn"
      >
        <h6 className="chosen_category">{text[metal]}</h6>
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
        {metals.map((metalItem) => (
          <MenuItem key={metalItem} onClick={() => handleChoose(metalItem)}>
            <span>{text[metalItem]}</span>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default MetalChooser;
