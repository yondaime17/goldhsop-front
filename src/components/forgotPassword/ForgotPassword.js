import React, { useState } from "react";

import { useLanguage } from "../../context/LanguageContext";

import texts from "../../utils/Texts";

import "./ForgotPassword.scss";

const ForgotPassword = () => {
  const { language } = useLanguage();
  const languageState = language || ka;
  const text = texts[language] || texts.en;

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleForgotPassword = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, languageState }),
        },
      );

      const data = await response.json();
      setMessage(data.message); 
    } catch (error) {
      setMessage(error);
    }
  };

  return (
    <div className="forgot_password">
      <h5>{text.forgotPassword}</h5>
      <div className="reset_form">
        <label>{text.email}</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleForgotPassword}>{text.resetPassword}</button>
        <p className="message">{message}</p>
      </div>
    </div>
  );
};

export default ForgotPassword;
