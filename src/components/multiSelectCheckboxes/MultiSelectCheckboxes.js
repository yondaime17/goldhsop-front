import React, { useState, useEffect, useRef } from "react";

import texts from "../../utils/Texts";
import { useLanguage } from "../../context/LanguageContext";

import ArrowIcon from "../arrowIcon/ArrowIcon";

import "./MultiSelectCheckboxes.scss";

const MultiSelectCheckboxes = ({ options, needsTranslation, getData }) => {
  const { language } = useLanguage();
  const text = texts[language] || texts.ka;
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggleOption = (option) => {
    const index = selectedOptions.indexOf(option);

    if (index === -1) {
      setSelectedOptions([...selectedOptions, option]);
    } else {
      const updatedOptions = [...selectedOptions];
      updatedOptions.splice(index, 1);
      setSelectedOptions(updatedOptions);
    }
  };

  const handleSelectAll = () => {
    setSelectedOptions(options);
  };

  const handleDeselectAll = () => {
    setSelectedOptions([]);
  };

  const handleToggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  getData(selectedOptions)

  

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="MultiSelectDropdown" ref={dropdownRef}>
      <button
        className={
          dropdownVisible
            ? "multiselect_btn multiselect_unbordered"
            : "multiselect_btn"
        }
        onClick={handleToggleDropdown}
      >
        <p className="choose_option">{text.choose}</p>
        <ArrowIcon />
      </button>
      {dropdownVisible && (
        <div className="multiselect_dropdown">
          <div className="multiselect_option">
            <input
              type="checkbox"
              checked={selectedOptions.length === 0}
              onChange={handleDeselectAll}
            />
            <label className="option_label">{text.deselectAll}</label>
          </div>
          <div className="multiselect_option">
            <input
              type="checkbox"
              checked={selectedOptions.length === options.length}
              onChange={handleSelectAll}
            />
            <label className="option_label">{text.selectAll}</label>
          </div>

          <div className="multiselect_options">
            {options.map((option) => (
              <div key={option} className="multiselect_option">
                <input
                  type="checkbox"
                  value={option}
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleToggleOption(option)}
                />
                <label className="option_label">
                  {needsTranslation ? text[option] : option}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelectCheckboxes;
