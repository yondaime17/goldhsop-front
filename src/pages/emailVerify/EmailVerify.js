import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import texts from "../../utils/Texts";
import { useLanguage } from "../../context/LanguageContext";

import "./EmailVerify.scss";

const EmailVerify = () => {
  const { verificationCode } = useParams();
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);

  const { language } = useLanguage();
  const text = texts[language] || texts.ka;

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/auth/verify/${verificationCode}`
        );
        setMessage(response.data.message);
        setErrorMsg(null);
      } catch (error) {
        setErrorMessage(error.response.data.message);
      }
    };

    verifyEmail();
  }, [verificationCode]);

  return (
    <div className="email_verify page">
      <div className="verify_message">
        <p>{errorMsg ? errorMsg : text.emailVerified}</p>
      </div>
    </div>
  );
};

export default EmailVerify;
