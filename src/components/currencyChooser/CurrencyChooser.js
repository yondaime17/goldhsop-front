import React, { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { GoChevronDown } from "react-icons/go";
import Cookies from "js-cookie";

import "./CurrencyChooser.scss";

const CurrencyChooser = ({ currencyChange, setCurrencyChange }) => {
  const { lightTheme } = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState("GEL"); // State to manage selected currency
  const open = Boolean(anchorEl);

  useEffect(() => {
    // On component mount, check if currency is already set in cookies
    const savedCurrency = Cookies.get("selectedCurrency");
    if (savedCurrency) {
      setSelectedCurrency(savedCurrency);
    }
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
    Cookies.set("selectedCurrency", currency, { expires: 365 }); // Saving selected currency to cookies
    setCurrencyChange(!currencyChange);
    handleClose();
  };

  return (
    <div className="currency_chooser">
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <span className="chosen_currency">
          {selectedCurrency === "USD" ? "$" : "₾"}
          <span className="currency_icon">{selectedCurrency}</span>
        </span>
        <div className="dropdown_icon">
          <GoChevronDown
            size="18px"
            color={!lightTheme ? "white" : "#2e2e2e"}
          />
        </div>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => handleCurrencyChange("USD")}>
          <span>$ USD</span>
        </MenuItem>
        <MenuItem onClick={() => handleCurrencyChange("GEL")}>
          <span>₾ GEL</span>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default CurrencyChooser;
