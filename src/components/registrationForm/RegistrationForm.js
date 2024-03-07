import React, { useState, useRef } from "react";
import texts from "../../utils/Texts";
import { useLanguage } from "../../context/LanguageContext";
import LoginBox from "../loginBox/LoginBox";
import "./RegistrationForm.scss";

const RegistrationForm = ({ handleClose }) => {
  const { language } = useLanguage();
  const text = texts[language] || texts.en;

  const usernameRef = useRef();
  const emailRef = useRef();
  const nameRef = useRef();
  const lastNameRef = useRef();
  const mobilePhoneRef = useRef();
  const passwordRef = useRef();
  const repeatPasswordRef = useRef();

  const [errors, setErrors] = useState({});
  const [moveToLogin, setMoveToLogin] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!usernameRef.current.value.trim()) {
      newErrors.username = "Username is required";
    }
    if (!emailRef.current.value.trim()) {
      newErrors.email = "Email is required";
    }
    if (!nameRef.current.value.trim()) {
      newErrors.name = "Name is required";
    }
    if (!lastNameRef.current.value.trim()) {
      newErrors.lastName = "Last Name is required";
    }
    if (!mobilePhoneRef.current.value.trim()) {
      newErrors.mobilePhone = "Mobile Phone is required";
    }
    if (!passwordRef.current.value.trim()) {
      newErrors.password = "Password is required";
    }
    if (passwordRef.current.value !== repeatPasswordRef.current.value) {
      newErrors.repeatPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const formData = {
        username: usernameRef.current.value,
        email: emailRef.current.value,
        name: nameRef.current.value,
        lastName: lastNameRef.current.value,
        mobilePhone: mobilePhoneRef.current.value,
        password: passwordRef.current.value,
        repeatPassword: repeatPasswordRef.current.value,
      };
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        alert(`Registration failed: ${errorData.message}`);
        return;
      }
      handleClose();
      alert("Registration successful! Check your email for verification code.");
    } catch (error) {
      console.error("Network error:", error);
      alert("A network error occurred. Please check your internet connection and try again.");
    }
  };
  

  return (
    <>
      {moveToLogin ? (
        <LoginBox />
      ) : (
        <form className="registration_box" onSubmit={handleSubmit}>
          <h5 className="modal_title">{text.registration}</h5>
          <label>
            {text.shopName}
            <input type="text" ref={usernameRef} required />
          </label>
          <br />
          <label>
            {text.email}
            <input type="email" ref={emailRef} required />
          </label>
          <br />
          <label>
            {text.firstName}
            <input type="text" ref={nameRef} required />
          </label>
          <br />
          <label>
            {text.lastName}
            <input type="text" ref={lastNameRef} required />
          </label>
          <br />
          <label>
            {text.mobileNumber}
            <input type="text" ref={mobilePhoneRef} required />
          </label>
          <br />
          <label>
            {text.password}
            <input type="password" ref={passwordRef} required />
          </label>
          <br />
          <label>
            {text.repeatPassword}
            <input type="password" ref={repeatPasswordRef} required />
          </label>
          <br />
          {errors.username && <div>{errors.username}</div>}
          {errors.email && <div>{errors.email}</div>}
          {errors.name && <div>{errors.name}</div>}
          {errors.lastName && <div>{errors.lastName}</div>}
          {errors.mobilePhone && <div>{errors.mobilePhone}</div>}
          {errors.password && <div>{errors.password}</div>}
          {errors.repeatPassword && <div>{errors.repeatPassword}</div>}
          <button className="registration_btn" type="submit">
            {text.register}
          </button>
          <div className="already_registered">
            <p>{text.alreadyRegistered} </p>
            <button onClick={() => setMoveToLogin(true)}>{text.login}</button>
          </div>
        </form>
      )}
    </>
  );
};

export default RegistrationForm;
