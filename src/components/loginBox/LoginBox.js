import React, { useState } from "react";

import { useLanguage } from "../../context/LanguageContext";

import texts from "../../utils/Texts";

import RegisterForm from "../registrationForm/RegistrationForm";

import ForgotPassword from "../forgotPassword/ForgotPassword";

import { BiReset } from "react-icons/bi";

import "./LoginBox.scss";

export default function LoginBox({ handleClose, login }) {
  const { language } = useLanguage();
  const text = texts[language] || texts.en;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [moveToRegister, setMoveToRegister] = useState(false);
  const [moveToResetPassword, setMoveToResetPassword] = useState(false);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e, formData) => {
    login(formData);
    handleClose();
  };

  return (
    <>
      {moveToRegister ? (
        <RegisterForm />
      ) : moveToResetPassword ? (
        <ForgotPassword />
      ) : (
        <div className="login_box">
          <h5 className="modal_title">{text.authorization}</h5>
          <div className="login_form">
            <label>{text.email}</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="password_field">
            <label>{text.password}</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) => handleChange(e)}
            />
            <button
              onClick={() => setMoveToResetPassword(true)}
              className="reset_password_btn"
            >
              <BiReset size="17px" color="grey" />
            </button>
          </div>
          <button
            className="authorization_btn"
            type="button"
            onClick={(e) => handleLogin(e, formData)}
          >
            {text.login}
          </button>
          <div className="not_registered">
            <p>{text.notRegistered} </p>
            <button onClick={() => setMoveToRegister(true)}>
              {text.register}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
