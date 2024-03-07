import { useTheme } from "../../context/ThemeContext";
import { GoChevronDown } from "react-icons/go";

const ArrowIcon = () => {
  const { lightTheme } = useTheme();
  return <GoChevronDown size="18px" color={lightTheme ? "#333" : "white"} />;
};

export default ArrowIcon;
