import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import texts from "../../utils/Texts";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import RegistrationForm from "../registrationForm/RegistrationForm";

import "./Register.scss";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#323b43",
  border: "2px solid #000",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

export default function Register() {
  const { language } = useLanguage();
  const text = texts[language] || texts.en;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  return (
    <div>
      <button className="register_btn" onClick={handleOpen}>
        {text.register}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <RegistrationForm handleClose={handleClose} />
        </Box>
      </Modal>
    </div>
  );
}
