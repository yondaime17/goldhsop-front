import * as React from "react";

import { useLanguage } from "../../context/LanguageContext";
import texts from "../../utils/Texts";

import Categories from "../categories/Categories";
import ProbChooser from "../probChooser/ProbChooser";
import MetalChooser from "../metalChooser/MetalChooser";
import PriceChooser from "../priceChooser/PriceChooser";
import WeightChooser from "../weightChooser/WeightChooser";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

import { MdFilterList } from "react-icons/md";

import "./MobileFilter.scss";

export default function MobileFilter() {
  const { language } = useLanguage();

  const text = texts[language] || texts.ka;

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

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
        width: anchor === "top" || anchor === "bottom" ? "100vw" : 250,
        height: "80vh",
        background: "#323b43",
      }}
      role="presentation"
    >
      <div className="filter_tool">
        <Categories />
        <ProbChooser />
        <PriceChooser />
        <WeightChooser />
        <div className="img_logo">
          <img
            alt="Shopgold.ge - ოქროს ნივთების ყიდვა/გაყიდვა"
            src="https://res.cloudinary.com/dgyqivinq/image/upload/v1706700617/goldshop/gjda7qlfjtebfsxjonmi.png"
          />
        </div>
      </div>
    </Box>
  );

  return (
    <div>
      {["bottom"].map((anchor) => (
        <React.Fragment key={anchor}>
          <button className="show_filter" onClick={toggleDrawer(anchor, true)}>
            <p>ფილტრი</p>
            <MdFilterList size="16px" color="grey" />
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
