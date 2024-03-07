import React from "react";
import { PiSunDimFill } from "react-icons/pi";
import { HiMoon } from "react-icons/hi";
import { useTheme } from "../../context/ThemeContext";
import "./ThemeChooser.scss";

const ThemeChooser = () => {
  const { lightTheme, changeTheme } = useTheme();

  return (
    <button className="theme_chooser" onClick={() => changeTheme()}>
      {!lightTheme ? (
        <PiSunDimFill color="#CBA135" size="38px" />
      ) : (
        <HiMoon color="#5a5a5a" size="32px" />
      )}
    </button>
  );
};

export default ThemeChooser;
