import * as React from "react";
import Radio from "@mui/material/Radio";
import texts from "../../utils/Texts";
import { useLanguage } from "../../context/LanguageContext";
import "./ProbChooser.scss";
import { useTheme } from "../../context/ThemeContext";
import MultiSelectCheckboxes from "../multiSelectCheckboxes/MultiSelectCheckboxes";

export default function ProbChooser({getData}) {
  const { lightTheme } = useTheme();
  const { language } = useLanguage();
  const text = texts[language] || texts.en;

  const radioStyle = {
    color: !lightTheme ? "#616161" : "black",
    "&.Mui-checked": {
      color: !lightTheme ? "#a8741a" : "#333",
    },
  };

  const options = [333, 375, 583, 585, 750, 875, 900, 916, 958, 999];
  return (
    <div className="prob_chooser">
      <h5 className="title">{text.probe}</h5>
      <MultiSelectCheckboxes options={options} getData={getData}/>
    </div>
  );
}
