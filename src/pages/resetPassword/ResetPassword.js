import React, { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useParams, useNavigate } from "react-router-dom";
import texts from "../../utils/Texts";
import "./ResetPassword.scss";

const ResetPassword = ({ lightTheme }) => {
  const navigate = useNavigate();
  const { token } = useParams();

  const { language } = useLanguage();
  const text = texts[language] || texts.en;

  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async () => {
    try {
      if (!token || !newPassword || !repeatPassword) {
        setMessage("Token or password is missing.");
        return;
      }
      if (newPassword !== repeatPassword) {
        setMessage("Passwords do not match.");
        return;
      }
      if (newPassword.length < 6) {
        setMessage("Password must be at least 6 characters");
        return;
      }
      const url = `http://localhost:3000/auth/reset-password/${token}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword }),
      });

      const data = await response.json();
      setMessage(data.message);

      if (response.ok) {
        setTimeout(() => {
          navigate("/");
        }, 300);
      }
    } catch (error) {
      setMessage(error.message || "An error occurred.");
    }
  };

  return (
    <div className="reset_password page">
      <div className="reset_form">
        <h5>{text.resetPassword}</h5>
        <label>{text.newPassword}</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <label className="repeat_password">{text.repeatPassword}</label>
        <input
          type="password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
        <button className="change_password" onClick={handleResetPassword}>
          {text.changePassword}
        </button>
        <p className="message">{message}</p>
      </div>
    </div>
  );
};

export default ResetPassword;
