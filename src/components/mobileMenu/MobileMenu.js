import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import { Divider } from "@mui/material";
import "./MobileMenu.scss";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { RxHamburgerMenu } from "react-icons/rx";
import { useTheme } from "../../context/ThemeContext";
import "./MobileMenu.scss";
import SocialIcons from "../socialIcons/SocialIcons";

export default function MobileMenu({ isHomePage, isItemsPage, isSellersPage }) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const { language } = useLanguage();
  const { lightTheme } = useTheme();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Link className="link" to={`/${language}/`}>
          <h3 className={isHomePage ? "active_page" : ""}>მთავარი</h3>
        </Link>
        <Link className="link" to={`/${language}/items`}>
          <h3 className={isItemsPage ? "active_page" : ""}>ნივთები</h3>
        </Link>
        <Link className="link" to={`/${language}/sellers`}>
          <h3 className={isSellersPage ? "active_page" : ""}>მოვაჭრეები</h3>
        </Link>
        <div className="divider">
          <Divider color="white" />
          <div className="socials">
            <SocialIcons whiteColor={true} />
          </div>
        </div>
      </List>
    </Box>
  );

  return (
    <div>
      {["top"].map((anchor) => (
        <React.Fragment key={anchor}>
          <button className="burger_btn" onClick={toggleDrawer(anchor, true)}>
            <RxHamburgerMenu
              color={lightTheme ? "#1b1b1b" : "white"}
              size="26px"
            />
          </button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
