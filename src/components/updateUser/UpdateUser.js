import React, { useState, useRef } from "react";
import axios from "axios";

import texts from "../../utils/Texts";
import { useLanguage } from "../../context/LanguageContext";

import "./UpdateUser.scss";

const UpdateUser = ({ user }) => {
  const { language } = useLanguage();
  const text = texts[language] || text.ka;

  const [formData, setFormData] = useState({
    username: user.username,
    name: user.name,
    lastName: user.lastName,
    mobilePhone: user.mobilePhone,
    email: user.email,
    newPassword: "",
    currentPassword: "",
  });

  const [hasChanges, setHasChanges] = useState(false);
  const [msg, setMsg] = useState(null);
  const usernameRef = useRef();
  const nameRef = useRef();
  const lastNameRef = useRef();
  const mobilePhoneRef = useRef();
  const emailRef = useRef();
  const newPasswordRef = useRef();
  const currentPasswordRef = useRef();

  const handleChange = () => {
    setFormData({
      username: usernameRef.current.value,
      name: nameRef.current.value,
      lastName: lastNameRef.current.value,
      mobilePhone: mobilePhoneRef.current.value,
      email: emailRef.current.value,
      newPassword: newPasswordRef.current.value,
      currentPassword: currentPasswordRef.current.value,
    });
    setHasChanges(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const {
        username,
        name,
        lastName,
        mobilePhone,
        email,
        newPassword,
        currentPassword,
      } = formData;

      if (!hasChanges) {
        console.error("No changes detected");
        setMsg(text.noChanges);
        return;
      }

      if (currentPassword.length === 0 || !currentPassword) {
        console.error("Confirm with current password");
        setMsg(confirmWithPassword);
        return;
      }

      const updatedUser = {
        username: hasChanges ? username : undefined,
        name: hasChanges ? name : undefined,
        lastName: hasChanges ? lastName : undefined,
        mobilePhone: hasChanges ? mobilePhone : undefined,
        email: hasChanges ? email : undefined,
        newPassword: newPassword || undefined,
        currentPassword: currentPassword || undefined,
      };

      // Call the API only if there are changes
      if (hasChanges) {
        // Replace the URL with your actual user update endpoint
        await axios.put(
          "https://trsv9z-3000.csb.app/api/user/update",
          updatedUser,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        // Reset form data and set hasChanges to false after successful update
        setFormData({
          username: user.username,
          name: user.name,
          lastName: user.lastName,
          mobilePhone: user.mobilePhone,
          email: user.email,
          newPassword: "",
          currentPassword: "",
        });
        setHasChanges(false);

        setMsg(text.userUpdated);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="update_user">
      <label>{text.shopName}</label>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        ref={usernameRef}
      />

      <label>{text.firstName}</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        ref={nameRef}
      />

      <label>{text.lastName}</label>
      <input
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        ref={lastNameRef}
      />

      <label>{text.password}</label>
      <input
        type="password"
        name="newPassword"
        value={formData.newPassword}
        onChange={handleChange}
        ref={newPasswordRef}
        placeholder="******"
      />

      <label>{text.mobileNumber}</label>
      <input
        type="number"
        name="mobilePhone"
        value={formData.mobilePhone}
        onChange={handleChange}
        ref={mobilePhoneRef}
      />

      <label>{text.email}</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        ref={emailRef}
      />

      <label className="confirm">{text.confirmWithPassword}</label>
      <input
        type="password"
        name="currentPassword"
        ref={currentPasswordRef}
        value={formData.currentPassword}
        onChange={handleChange}
        placeholder={text.currentPassword}
      />

      {msg ? <p>{msg}</p> : null}

      <button className="update_user_btn" type="submit">
        {text.update}
      </button>
    </form>
  );
};

export default UpdateUser;
