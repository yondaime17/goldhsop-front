import { useLanguage } from "../../context/LanguageContext";
import { useState } from "react";
import { ThreeCircles } from "react-loader-spinner";

import texts from "../../utils/Texts";
import "./UserProfile.scss";
import Products from "../../components/products/Products";

import { Helmet } from "react-helmet";

export default function UserProfile({ lightTheme, seller, products, user }) {
  const { language } = useLanguage();
  const text = texts[language] || texts.ka;
  const [showNumber, setShowNumber] = useState(false);

  const sellerProducts = products.filter(
    (product) => product.owner === seller._id
  );

  let myProfile = false;

  if (user) {
    myProfile = seller._id === user._id;
  }

  return (
    <div className="user_profile_page page">
      <Helmet>
        <title>Shopgold</title>
        <meta property="og:title" content={seller.username} />
        <meta property="og:description" content="Shopgold.ge - Seller page - მოვაჭრის გვერდი" />
        <meta property="og:image" content="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/cddfa585-0197-4c1c-a6ba-b75632f25625/dg71wqy-50cc1b11-5eef-411e-b9e7-aa10e5d744f3.png/v1/fill/w_1920,h_1920,q_80,strp/golden_dragon_avatar__concept_art_of_by_exclusiveartmaker193_dg71wqy-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2NkZGZhNTg1LTAxOTctNGMxYy1hNmJhLWI3NTYzMmYyNTYyNVwvZGc3MXdxeS01MGNjMWIxMS01ZWVmLTQxMWUtYjllNy1hYTEwZTVkNzQ0ZjMucG5nIiwiaGVpZ2h0IjoiPD0xOTIwIiwid2lkdGgiOiI8PTE5MjAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uud2F0ZXJtYXJrIl0sIndtayI6eyJwYXRoIjoiXC93bVwvY2RkZmE1ODUtMDE5Ny00YzFjLWE2YmEtYjc1NjMyZjI1NjI1XC9leGNsdXNpdmVhcnRtYWtlcjE5My00LnBuZyIsIm9wYWNpdHkiOjk1LCJwcm9wb3J0aW9ucyI6MC40NSwiZ3Jhdml0eSI6ImNlbnRlciJ9fQ.f6tnnyeMPKJDeo5kmnODPpnp--dQZi8X5M4TRSG9Aow" />
      </Helmet>
      {!seller ? (
        <ThreeCircles
          visible={true}
          height="100"
          width="100"
          color="#fa813b"
          ariaLabel="three-circles-loading"
          wrapperClass="loader"
        />
      ) : (
        <div className="profile">
          <div className="profile_header">
            <div className="avatar">
              <img
                src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/cddfa585-0197-4c1c-a6ba-b75632f25625/dg71wqy-50cc1b11-5eef-411e-b9e7-aa10e5d744f3.png/v1/fill/w_1920,h_1920,q_80,strp/golden_dragon_avatar__concept_art_of_by_exclusiveartmaker193_dg71wqy-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2NkZGZhNTg1LTAxOTctNGMxYy1hNmJhLWI3NTYzMmYyNTYyNVwvZGc3MXdxeS01MGNjMWIxMS01ZWVmLTQxMWUtYjllNy1hYTEwZTVkNzQ0ZjMucG5nIiwiaGVpZ2h0IjoiPD0xOTIwIiwid2lkdGgiOiI8PTE5MjAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uud2F0ZXJtYXJrIl0sIndtayI6eyJwYXRoIjoiXC93bVwvY2RkZmE1ODUtMDE5Ny00YzFjLWE2YmEtYjc1NjMyZjI1NjI1XC9leGNsdXNpdmVhcnRtYWtlcjE5My00LnBuZyIsIm9wYWNpdHkiOjk1LCJwcm9wb3J0aW9ucyI6MC40NSwiZ3Jhdml0eSI6ImNlbnRlciJ9fQ.f6tnnyeMPKJDeo5kmnODPpnp--dQZi8X5M4TRSG9Aow"
                alt="goldshop.ge"
              />
            </div>
            <div className="user_info">
              <h6 className="username">{seller.username}</h6>

              {showNumber ? (
                <p className="mobile_number">{seller.mobilePhone}</p>
              ) : (
                <button onClick={() => setShowNumber(true)} className="connect">
                  {text.contact}
                </button>
              )}
            </div>
          </div>
          <Products
            lightTheme={lightTheme}
            products={sellerProducts}
            myProfile={myProfile}
            seller={seller}
          />
        </div>
      )}
    </div>
  );
}
