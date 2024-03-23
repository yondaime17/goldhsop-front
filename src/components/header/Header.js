import { Link, useLocation } from "react-router-dom";

import { useLanguage } from "../../context/LanguageContext";
import ThemeChooser from "../themeChooser/ThemeChooser";

import Login from "../login/Login";
import Register from "../register/Register";
import LanguageChooser from "../languageChooser/LanguageChooser";
import Navbar from "../navbar/Navbar";
import User from "../user/User";
import SearchBox from "../searchBox/SearchBox";

import texts from "../../utils/Texts";

import SocialIcons from "../socialIcons/SocialIcons";
import CurrencyChooser from "../currencyChooser/CurrencyChooser";

import AddProductBtn from "../addProductBtn/AddProductBtn";

import WishlistBtn from "../wishlistBtn/WishlistBtn";

import MobileAuth from "../mobileAuth/MobileAuth";
import MobileMenu from "../mobileMenu/MobileMenu";


import "./Header.scss";


export default function Header({
  currencyChange,
  setCurrencyChange,
  setIsLogined,
  user,
  login,
  logout,
  wishlist
}) {
  const location = useLocation();
  const { language } = useLanguage();

  const text = texts[language] || texts.ka;

  const isHomePage =
    location.pathname === "/" || location.pathname === `/${language}/`;

  const isItemsPage =
    location.pathname === "/items" ||
    location.pathname === `/${language}/items`;

  const isSellersPage =
    location.pathname === "/sellers" ||
    location.pathname === `/${language}/sellers`;

  return (
    <header>
      <div className="top_bar">
        <div className="mobile_menu">
          <MobileMenu
            isHomePage={isHomePage}
            isItemsPage={isItemsPage}
            isSellersPage={isSellersPage}
          />
        </div>

        <div className="left_box">
          <div className="logo_img">
            <img
              alt="Shopgold.ge"
              src="https://res.cloudinary.com/dgyqivinq/image/upload/v1706700617/goldshop/gjda7qlfjtebfsxjonmi.png"
            />
           
          </div>
          <div className="socials">

            <h5>
              <strong>{text.topic}</strong>
            </h5>

          </div>
          
        </div>

        <div className="header_btns">
          {!user ? (
            <div className="authentication">
              <Login setIsLogined={setIsLogined} login={login} />
              <span>/</span>
              <Register />
            </div>
          ) : (
            <User setIsLogined={setIsLogined} user={user} logout={logout} />
          )}
          <AddProductBtn text={text} />
          <CurrencyChooser
            setCurrencyChange={setCurrencyChange}
            currencyChange={currencyChange}
          />
          {!user ? (
            <div className="mobile_auth">
              <MobileAuth setIsLogined={setIsLogined} login={login} />
            </div>
          ) : null}
          <Link to={`${language}/wishlist`} className="link wishlist_link">
            <span>{wishlist.length}</span>
            <WishlistBtn />
          </Link>
          <ThemeChooser />
          <LanguageChooser />
        </div>
      </div>

      <div
        className={isHomePage ? "bottom_bar" : "bottom_bar bottom_bar_bordered"}
      >
        <Navbar
          isHomePage={isHomePage}
          isItemsPage={isItemsPage}
          isSellersPage={isSellersPage}
        />

        <div className="logo">
          <Link to={language + "/"} className="link">
            <h1>SHOPGOLD.GE</h1>
          </Link>
        </div>
        <Link to={language + "/"} className="link mobile_logo_img">
          <img
            alt="Shopgold.ge"
            src="https://res.cloudinary.com/dgyqivinq/image/upload/v1706700617/goldshop/gjda7qlfjtebfsxjonmi.png"
          />
        </Link>
        <div className="right_box">
        <Link className="link contact_link" to={language + "/contact"}>
          {text.contact}
        </Link>
        <SocialIcons />
        </div>
       

      </div>
    </header>
  );
}
