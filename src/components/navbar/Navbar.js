import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";

import "./Navbar.scss";

export default function Navbar({
  lightTheme,
  isHomePage,
  isItemsPage,
  isSellersPage,
}) {
  const { language } = useLanguage();

  return (
    <nav>
      <div className="menu">
        <Link className="link" to={`/${language}/`}>
          <h3 className={isHomePage ? "active_page" : ""}>მთავარი</h3>
        </Link>

        <Link className="link" to={`/${language}/items`}>
          <h3 className={isItemsPage ? "active_page" : ""}>ნივთები</h3>
        </Link>

        <Link className="link" to={`/${language}/sellers`}>
          <h3 className={isSellersPage ? "active_page" : ""}>მოვაჭრეები</h3>
        </Link>
      </div>
    </nav>
  );
}
