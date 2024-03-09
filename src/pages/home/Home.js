import { useLanguage } from "../../context/LanguageContext";
import Hero from "../../components/hero/Hero";
import Products from "../../components/products/Products";

import texts from "../../utils/Texts";
import "./Home.scss";

import { Helmet } from 'react-helmet';

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
       <Helmet>
        <title>Shopgold</title>
        <meta property="og:title" content="Shopgold.ge - Home Page" />
        <meta property="og:description" content="Buy/sell gold items - ოქროს ნივთების ყიდვა/გაყიდვა" />
        <meta property="og:image" content="https://res.cloudinary.com/dgyqivinq/image/upload/v1705410493/goldshop/srzisor9pwh2abgyfheh.jpg" />
      </Helmet>
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
