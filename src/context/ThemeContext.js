// ThemeContext.js
import React, { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
  const [lightTheme, setLightTheme] = useState(() => {
    // Try to get theme from cookies, default to true if not found
    return Cookies.get("lightTheme") !== "false";
  });

  const changeTheme = () => {
    setLightTheme(!lightTheme);
    // Save theme to cookies
    Cookies.set("lightTheme", !lightTheme, { expires: 365 }); // Set expiration for 1 year
  };

  return (
    <ThemeContext.Provider value={{ lightTheme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
