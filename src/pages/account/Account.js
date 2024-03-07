import React, { useState } from "react";

import texts from "../../utils/Texts";
import { useLanguage } from "../../context/LanguageContext";

import UpdateUser from "../../components/updateUser/UpdateUser";
import VerifyEmail from "../../components/verifyEmail/VerifyEmail";

import "./Account.scss";

const Account = ({ user }) => {
  const { language } = useLanguage();
  const text = texts[language] || text.ka;

  return (
    <div className="page my_account">
      {user ? (
        <>
          <h4 className="page_title">{text.myAccount}</h4>
          <div className="account_info">
            <UpdateUser user={user} />
            {!user.isVerified ? <VerifyEmail email={user.email} /> : null}
          </div>
        </>
      ) : (
        <h4 className="login_msg">{text.pleaseLogin}</h4>
      )}
    </div>
  );
};

export default Account;
