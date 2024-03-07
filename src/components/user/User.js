import * as React from "react";
import UserDropdown from "../userDropdown/UserDropdown";
import { Link } from "react-router-dom";
import { SiMarketo } from "react-icons/si";
import { useTheme } from "../../context/ThemeContext";

import "./User.scss";

export default function User({ setIsLogined, user, logout }) {
  const { lightTheme } = useTheme();
  return (
    <div className="user">
      <button className="my_items_btn">
        <Link className="link" to={`/${user.username}`}>
          <SiMarketo color={!lightTheme ? "white" : "#333"} size="18px" />
          <h6>ჩემი ნივთები</h6>
        </Link>
      </button>
      <UserDropdown setIsLogined={setIsLogined} user={user} logout={logout} />
    </div>
  );
}
