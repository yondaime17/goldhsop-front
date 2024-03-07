import { useLanguage } from "../../context/LanguageContext";
import texts from "../../utils/Texts";
import { BiSearchAlt } from "react-icons/bi";
import { useTheme } from "../../context/ThemeContext";
// import { useState } from "react";
import "./SearchBox.scss";

export default function SearchBox() {
  const { language } = useLanguage();
  const { lightTheme } = useTheme();
  const text = texts[language] || texts.en;
  // const [expandMobileSearch, setExpandMobileSearch] = useState(false);

  return (
    <>
      <div className="search">
        <div className="search_box">
          <input type="text" placeholder={`${text.search}...`} />
        </div>
        <button className="search_icon">
          <BiSearchAlt size="18px" color={lightTheme ? "white" : "white"} />
        </button>
      </div>
      {/* <div className="mobile_search">
        <button
          className="search_icon"
          onClick={() => setExpandMobileSearch(true)}
        >
          <BiSearchAlt size="18px" color={lightTheme ? "white" : "white"} />
        </button>
        <div className="search">
          <div className="search_box">
            <input type="text" placeholder={`${text.search}...`} />
          </div>
          <button className="search_icon">
            <BiSearchAlt size="18px" color={lightTheme ? "white" : "white"} />
          </button>
        </div>
      </div> */}
    </>
  );
}
