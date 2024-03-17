import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import { useTheme } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";

import { getToken, saveToken, removeToken } from "./utils/Auth";

import Home from "./pages/home/Home";
import Items from "./pages/items/Items";
import MyItems from "./pages/myItems/MyItems";
import Sellers from "./pages/sellers/Sellers";
import Account from "./pages/account/Account";
import Wishlist from "./pages/wishlist/Wishlist";
import AddProduct from "./pages/addProduct/AddProduct";
import EmailVerify from "./pages/emailVerify/EmailVerify";
import UserProfile from "./pages/userProfile/UserProfile";
import CategoryPage from "./pages/categoryPage/CategoryPage";
import ResetPassword from "./pages/resetPassword/ResetPassword";
import ProductDetails from "./pages/productDetails/ProductDetails";
import Searched from "./pages/searched/Searched";

import Header from "./components/header/Header";

import "./styles.scss";

export default function App() {
  const { lightTheme } = useTheme();
  const [token, setToken] = useState();
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [isToken, setIsToken] = useState();
  const [products, setProducts] = useState([]);
  const [isLogined, setIsLogined] = useState(false);
  const [currencyChange, setCurrencyChange] = useState(false);
  const [wishlist, setWishlist] = useState(
    Cookies.get("wishlist") ? JSON.parse(Cookies.get("wishlist")) : []
  );

  useEffect(() => {
    document.body.style.backgroundColor = lightTheme ? "#f3f3f3" : "#242424";

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [lightTheme]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://goldhsop-back.vercel.app/api/items");
        const data = await response.json();
        setProducts(data);
      } catch (error) {}
    };

    fetchProducts();

    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {}
    };

    fetchUsers();

    const storedToken = getToken();

    if (storedToken) {
      setToken(storedToken);

      axios
        .get("http://localhost:3000/api/user/profile", {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then((response) => {
          setUser(response.data);
          setIsToken(true);
          setIsLogined(true);
        })
        .catch((error) => {
          setUser(null);
          setIsToken(false);
          setIsLogined(false);
        });
    } else {
      setIsToken(false);
    }
  }, []);

  const login = async (formData) => {
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        saveToken(token);
  
        axios
          .get("http://localhost:3000/api/user/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setUser(response.data);
            setIsLogined(true);
            setIsToken(true);
          })
          .catch((error) => {
            logout();
          });
      } else if (response.status === 401) {
        alert("Invalid email or password");
      } else {
        const errorData = await response.json();
        alert("Login failed", errorData);
      }
    } catch (error) {
      alert(error);
    }
  };
  

  const logout = () => {
    removeToken();
    setIsLogined(false);
    setIsToken(false);
    setUser(null);
  };

  const categories = [
    "crosses",
    "rings",
    "bracelets",
    "earings",
    "chains",
    "watches",
    "coins",
    "other",
  ];

  useEffect(() => {
    Cookies.set("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const sellers = users.filter((user) =>
    products.some((product) => product.owner === user._id)
  );

  return (
    <Router>
      <LanguageProvider>
        <div className={lightTheme ? "light" : "dark"}>
          <Header
            isToken={isToken}
            setToken={setToken}
            setIsLogined={setIsLogined}
            user={user}
            login={login}
            logout={logout}
            setCurrencyChange={setCurrencyChange}
            currencyChange={currencyChange}
            wishlist={wishlist}
          />
          <Routes>
  {categories.map((category) => (
    <Route
      key={category}
      path="/:language/:category"
      element={
        <CategoryPage
          categories={categories}
          category={category}
          products={products}
        />
      }
    />
  ))}

  <Route path="/:language?/account" element={<Account user={user} />} />
  <Route path="/:language?/verify/:verificationCode" element={<EmailVerify />} />
  <Route path="/:language?/reset-password/:token" element={<ResetPassword />} />
  <Route path="/:language?/sellers" element={<Sellers sellers={sellers} />} />
  <Route path="/:language?/add_product" element={<AddProduct user={user} isToken={isToken} />} />
  {sellers && sellers.length > 0 && sellers.map((seller, index) => (
    <Route
      key={seller._id}
      path={`/:language?/${seller.username.toLowerCase()}`}
      element={<UserProfile seller={seller} products={products} user={user} />}
    />
  ))}
  <Route
    path="/:language?/wishlist"
    element={<Wishlist currencyChange={currencyChange} wishlist={wishlist} setWishlist={setWishlist} />}
  />
  <Route
    path="/:language?/item/:id"
    element={<ProductDetails currencyChange={currencyChange} wishlist={wishlist} setWishlist={setWishlist} />}
  />
  <Route
    path="/:language?/products/category/:category/standard/:standard/minPrice/:minPrice/maxPrice/:maxPrice/minWeight/:minWeight/maxWeight/:maxWeight/seller/:seller/"
    element={<Searched products={products} categories={categories}/>}
  />
  <Route
    path="/:language?/items"
    element={<Items products={products} currencyChange={currencyChange} wishlist={wishlist} setWishlist={setWishlist} />}
  />
  <Route
    path="/:language?/*"
    element={<Home products={products} currencyChange={currencyChange} wishlist={wishlist} setWishlist={setWishlist} />}
  />
</Routes>

        </div>
      </LanguageProvider>
    </Router>
  );
}
