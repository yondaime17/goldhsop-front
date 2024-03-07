import React from "react";
import texts from "../../utils/Texts";
import { useLanguage } from "../../context/LanguageContext";

import "./VerifyEmail.scss";

const VerifyEmail = ({ email }) => {
  const { language } = useLanguage();
  const text = texts[language] || texts.ka;

  const handleVerifyClick = async () => {
    console.log(email);
    try {
      const response = await fetch(
        "https://trsv9z-3000.csb.app/auth/send-verification-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // Optionally, you can pass any data needed for the email verification in the body
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        // Email sent successfully
        alert("Verification email sent successfully!");
      } else {
        // Failed to send email
        alert("Failed to send verification email");
      }
    } catch (error) {
      console.error("Error sending verification email:", error);
      alert("Error sending verification email. Please try again later.");
    }
  };

  return (
    <div>
      <p>{text.notVerified}</p>
      <button className="verify_btn" onClick={() => handleVerifyClick()}>
        {text.verify}
      </button>
    </div>
  );
};

export default VerifyEmail;
