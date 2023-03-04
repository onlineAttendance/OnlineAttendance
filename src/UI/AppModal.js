import React, { useContext } from "react";
import { Modal, Typography, Box } from "@mui/material";
import SignIn from "../Content/SignIn";
import SignUp from "../Content/SignUp";
import MyInfo from "../Content/MyInfo";
import { AuthContext } from "../context/auth-context";

const AppModal = (props) => {
  const authContext = useContext(AuthContext);

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width:0.7,
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        {props.SignUp ? (
          <SignUp handleCloseSignUp={props.handleCloseSignUp} handleClose={props.handleClose}/>
        ) : authContext.isLogin ? (
          <MyInfo handleClose={props.handleClose}/>
        ) : (
          <SignIn handleSignUp={props.handleSignUp} handleClose={props.handleClose}/>
        )}
      </Box>
    </Modal>
  );
};

export default AppModal;
