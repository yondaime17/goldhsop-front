import React, { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

export const useLanguage = () => {
  return useContext(LanguageContext);
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("ka");

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  useEffect(() => {
    // Check the current path and update the language accordingly
    const currentPath = window.location.pathname;
    const isEnglish = currentPath.startsWith("/en");

    if (isEnglish) {
      setLanguage("en");
    } else {
      setLanguage("ka");
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
