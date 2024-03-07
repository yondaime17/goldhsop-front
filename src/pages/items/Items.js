import React from "react";
import Products from "../../components/products/Products";
import "./Items.scss";

const Items = () => {
  return (
    <div className="items_page page">
      <Products filter={true} />
    </div>
  );
};

export default Items;
