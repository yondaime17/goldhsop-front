import * as React from "react";
import { useLanguage } from "../../context/LanguageContext";
import texts from "../../utils/Texts";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import LoginBox from "../loginBox/LoginBox";
import { BiLogIn } from "react-icons/bi";
import { useTheme } from "../../context/ThemeContext";

import "./Login.scss";

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

export default function Login({ login, isLogined, setIsLogined, isHomePage }) {
  const { language } = useLanguage();
  const text = texts[language] || texts.en;
  const { lightTheme } = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button className="login_btn" onClick={handleOpen}>
        <BiLogIn color={!lightTheme ? "white" : "black"} />
        <p>{text.login}</p>
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <LoginBox
            login={login}
            isLogined={isLogined}
            setIsLogined={setIsLogined}
            handleClose={handleClose}
          />
        </Box>
      </Modal>
    </div>
  );
}
