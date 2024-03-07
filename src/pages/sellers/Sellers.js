import React, { useEffect, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { Link } from "react-router-dom";
import "./Sellers.scss";
const Sellers = ({ sellers }) => {
  const { language } = useLanguage();

  return (
    <div className="sellers_page page">
      <h3 className="page_title">მოვაჭრეები</h3>
      <ul className="sellers">
        {sellers.map((seller, index) => {
          return (
            <li className="seller" key={seller.username}>
              <Link className="link" to={`/${language}/${seller.username}`}>
                <div className="avatar">
                  <img
                    src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/cddfa585-0197-4c1c-a6ba-b75632f25625/dg71wqy-50cc1b11-5eef-411e-b9e7-aa10e5d744f3.png/v1/fill/w_1920,h_1920,q_80,strp/golden_dragon_avatar__concept_art_of_by_exclusiveartmaker193_dg71wqy-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2NkZGZhNTg1LTAxOTctNGMxYy1hNmJhLWI3NTYzMmYyNTYyNVwvZGc3MXdxeS01MGNjMWIxMS01ZWVmLTQxMWUtYjllNy1hYTEwZTVkNzQ0ZjMucG5nIiwiaGVpZ2h0IjoiPD0xOTIwIiwid2lkdGgiOiI8PTE5MjAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uud2F0ZXJtYXJrIl0sIndtayI6eyJwYXRoIjoiXC93bVwvY2RkZmE1ODUtMDE5Ny00YzFjLWE2YmEtYjc1NjMyZjI1NjI1XC9leGNsdXNpdmVhcnRtYWtlcjE5My00LnBuZyIsIm9wYWNpdHkiOjk1LCJwcm9wb3J0aW9ucyI6MC40NSwiZ3Jhdml0eSI6ImNlbnRlciJ9fQ.f6tnnyeMPKJDeo5kmnODPpnp--dQZi8X5M4TRSG9Aow"
                    alt="goldshop.ge"
                  />
                </div>
              </Link>
              <h6>{seller.username}</h6>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sellers;
