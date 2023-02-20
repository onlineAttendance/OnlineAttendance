import {
  AppBar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Switch,
  Toolbar,
  Box,
} from "@mui/material";
import {
  Book,
  DomainVerification,
  AccountCircle,
  Login,
} from "@mui/icons-material";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth-context";

const Header = (props) => {
  const authContext = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    event.target.checked
      ? authContext.handleLogIn()
      : authContext.handleLogOut();
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleModalOpen = () => {
    handleClose();
    props.handleModalOpen();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {props.isAttendance ? <DomainVerification /> : <Book />}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {props.isAttendance ? "출석 체크" : "오늘의 말씀"}
          </Typography>
          {authContext.isLogin ? (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={authContext.handleLogOut}>LogOut</MenuItem>
                <MenuItem onClick={handleModalOpen}>My account</MenuItem>
              </Menu>
            </div>
          ) : (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleModalOpen}
                color="inherit"
              >
                <Login />
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
