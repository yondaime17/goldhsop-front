import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import texts from "../../utils/Texts";
import { useLanguage } from "../../context/LanguageContext";
import { AiOutlineLogout } from "react-icons/ai";
import { SiMarketo } from "react-icons/si";

import { RiAccountBoxFill } from "react-icons/ri";

import "./UserDropdown.scss";
import ArrowIcon from "../arrowIcon/ArrowIcon";
import { useTheme } from "../../context/ThemeContext";

export default function UserDropdown({ user, logout }) {
  const { lightTheme } = useTheme();
  const { language } = useLanguage();
  const text = texts[language] || texts.ka;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const signOut = () => {
    logout();
    handleClose();
  };

  console.log(user);

  return (
    <div className="user_dropdown">
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <div className="avatar">
          <img
            src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/cddfa585-0197-4c1c-a6ba-b75632f25625/dg71wqy-50cc1b11-5eef-411e-b9e7-aa10e5d744f3.png/v1/fill/w_1920,h_1920,q_80,strp/golden_dragon_avatar__concept_art_of_by_exclusiveartmaker193_dg71wqy-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2NkZGZhNTg1LTAxOTctNGMxYy1hNmJhLWI3NTYzMmYyNTYyNVwvZGc3MXdxeS01MGNjMWIxMS01ZWVmLTQxMWUtYjllNy1hYTEwZTVkNzQ0ZjMucG5nIiwiaGVpZ2h0IjoiPD0xOTIwIiwid2lkdGgiOiI8PTE5MjAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uud2F0ZXJtYXJrIl0sIndtayI6eyJwYXRoIjoiXC93bVwvY2RkZmE1ODUtMDE5Ny00YzFjLWE2YmEtYjc1NjMyZjI1NjI1XC9leGNsdXNpdmVhcnRtYWtlcjE5My00LnBuZyIsIm9wYWNpdHkiOjk1LCJwcm9wb3J0aW9ucyI6MC40NSwiZ3Jhdml0eSI6ImNlbnRlciJ9fQ.f6tnnyeMPKJDeo5kmnODPpnp--dQZi8X5M4TRSG9Aow"
            alt="goldshop.ge"
          />
        </div>
        <div className="dropdown_icon">
          <ArrowIcon />
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
        <MenuItem onClick={handleClose}>
          <Link className="link user_menu_item" to={`/${language}/my_items`}>
            <SiMarketo color="black" size="12px" />
            <span>{text.myItems}</span>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link className="link user_menu_item" to={`/${language}/account`}>
            <RiAccountBoxFill size="14px" color="black" />

            <span>{text.myAccount}</span>
          </Link>
        </MenuItem>
        <MenuItem onClick={() => signOut()}>
          <Link className="link user_menu_item">
            <AiOutlineLogout size="14px" color="black" />
            <span>{text.logout}</span>
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
}
