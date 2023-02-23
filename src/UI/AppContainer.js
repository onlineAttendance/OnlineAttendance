import React, { useState, useContext, useEffect } from "react";
import { Container, Stack, Box } from "@mui/material";
import Header from "../Component/Header";
import BottomNav from "../Component/BottomNav";
import AppModal from "./AppModal";
import Attendance from "../Content/Attendance";
import TodaysWord from "../Content/TodaysWord";
import { AuthContext } from "../context/auth-context";

const AppContainer = ({ children }) => {
  const [isAttendance, setIsAttendance] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const authContext = useContext(AuthContext);

  const handleSignUp = () => {
    setIsSignUp(true);
  };

  const handleCloseSignUp = () => {
    setIsSignUp(false);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsSignUp(false);
  };
  const handleBottomNavClick = (value) => {
    if (authContext.isLogin === false) {
      setIsAttendance(false);
      handleModalOpen();
    } else {
      setIsAttendance(value);
    }
  };

  return (
    <>
      <AppModal
        open={isModalOpen}
        SignUp = {isSignUp}
        handleClose={handleModalClose}
        handleSignUp={handleSignUp}
      ></AppModal>
      <Header
        isAttendance={isAttendance}
        handleModalOpen={handleModalOpen}
      ></Header>
      <Container maxWidth="md">
        <Stack sx={{ mt: 8, mb: 8 }}>
          <Box>{isAttendance ? <Attendance /> : <TodaysWord />}</Box>
        </Stack>
      </Container>
      <BottomNav
        isAttendance={isAttendance}
        handleBottomNavClick={handleBottomNavClick}
      ></BottomNav>
    </>
  );
};

export default AppContainer;
