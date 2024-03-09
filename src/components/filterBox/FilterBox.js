import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import texts from "../../utils/Texts";
import { useLanguage } from "../../context/LanguageContext";

import Categories from "../categories/Categories";
import ProbChooser from "../probChooser/ProbChooser";
import PriceChooser from "../priceChooser/PriceChooser";
import WeightChooser from "../weightChooser/WeightChooser";

import MobileFilter from "../mobileFilter/MobileFilter";

import "./FilterBox.scss";

export default function FilterBox({ seller }) {
  const { language } = useLanguage();
  const text = texts[language] || texts.en;
  const navigate = useNavigate();
  const location = useLocation();

  const [categories, setCategories] = useState([]);
  const [probe, setProbe] = useState([]);
  const [price, setPrice] = useState([null, null]);
  const [weight, setWeight] = useState([null, null]);
  const [sellerId, setSellerId] = useState("any");

// Apply filters and navigate to the updated URL
const applyFilters = () => {
  // const queryParams = new URLSearchParams();

  // if (categories.length > 0) {
  //   queryParams.append("categories", categories.join(","));
  // }
  
  // // Include probe only if it's not null
  // if (probe.length > 0) {
  //   queryParams.append("probe", probe.join(","));
  // }
  
  // if (price[0] !== null || price[1] !== null) {
  //   queryParams.append("minPrice", price[0]);
  //   queryParams.append("maxPrice", price[1]);
  // }
  // if (weight[0] !== null || weight[1] !== null) {
  //   queryParams.append("minWeight", weight[0]);
  //   queryParams.append("maxWeight", weight[1]);
  // }
  // if (seller) {
  //   queryParams.append("seller", seller);
  // }

  // const queryString = queryParams.toString().replace(/\%2C/g, '-');
  // const newUrl = `/products/${queryString}`;

  // queryString ? 
  // navigate(newUrl) : null

  const newUrl = `/products/category/${categories.length > 0 ? categories.join("_") : "any"}/standard/${probe.length > 0 ? probe.join("_") : "any"}/minPrice/${price[0] === null ? "0" : price[0]}/maxPrice/${price[1] === null ? "any" : price[1]}/minWeight/${weight[0] === null ? "0" : weight[0]}/maxWeight/${weight[1] === null ? "any" : weight[1]}/seller/${sellerId.username}`
  navigate(newUrl.toString())
};


  // Callback functions to update state
  const getCategories = (categoriesData) => {
    setCategories(categoriesData);
  };

  const getProbes = (probesData) => {
    setProbe(probesData);
  };

  // Update seller state
  useEffect(() => {
    seller ? setSellerId(seller) : setSellerId("any");
    console.log(sellerId)
  }, [sellerId]);

 
  // Clear query parameters when component unmounts
 

  return (
    <div className="filter_box">
      <div className="desktop_filter">
        <div className="filter_tool">
          <Categories getData={getCategories} />
          <ProbChooser getData={getProbes} />
          <PriceChooser setPrice={setPrice} />
          <WeightChooser setWeight={setWeight} />
        <button className="filter_btn" onClick={()=> applyFilters()}>{text.goFilter}</button>

        </div>
      </div>
      <div className="mobile_filter">
        <MobileFilter />
      </div>
    </div>
  );
}
