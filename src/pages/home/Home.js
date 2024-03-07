import { useLanguage } from "../../context/LanguageContext";
import Hero from "../../components/hero/Hero";
import Products from "../../components/products/Products";

import texts from "../../utils/Texts";
import "./Home.scss";

export default function Home({
  lightTheme,
  categories,
  products,
  currencyChange,
  wishlist,
  setWishlist,
}) {
  const { language } = useLanguage();
  const text = texts[language] || texts.ka;

  return (
    <div className="home page">
      <div className="layout">
        <div className="hero_div">
          <Hero />
        </div>
        <div className="main_block">
          <Products
            products={products}
            lightTheme={lightTheme}
            categories={categories}
            filter={true}
            currencyChange={currencyChange}
            wishlist={wishlist}
            setWishlist={setWishlist}
          />
        </div>
      </div>
    </div>
  );
}
