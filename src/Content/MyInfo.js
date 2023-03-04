import React, { useContext, useState } from "react";
import { AuthContext } from "../context/auth-context";
import { AttendanceContext } from "../context/attendance-context";
import { ProfileContext } from "../context/profile-context";
import {
  Grid,
  Link,
  Container,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { AccountCircle, Send } from "@mui/icons-material";
import useHttp from "../hooks/useHttp";

const MyInfo = (props) => {

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isSame, setIsSame] = useState(true);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    passwordVerification();
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
    passwordVerification();

  };
  const authContext = useContext(AuthContext);
  const attendanceContext = useContext(AttendanceContext);
  const profileContext = useContext(ProfileContext);

  const {
    passwordIsLodaing,
    passwordError,
    sendRequest: fetchPassword,
  } = useHttp();

  const passwordVerification = () => {
    if(password !== "" && newPassword !== ""){
      setIsSame(true);
    }
    else{
      setIsSame(false);
    }
  }
  const checkPassword = (data) => {
    props.handleClose();
  }

  const passwordChangeSubmit = (event) => {
    event.preventDefault();
    if(password.length === 4 && newPassword.length === 4 && password === newPassword){
      setIsSame(true);
      props.handleClose();
      fetchPassword(
        {
          url: "/api/users/account/password",
          method:"PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authContext.token}`,
          },
          body: {
            password: newPassword
          },
        },
        checkPassword
      );
    }
    else{
      setIsSame(false);
      console.log("비밀번호가 일치하지 않습니다.")
    }
    
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ width: 80, height: 80 }}>
          <AccountCircle sx={{ width: 80, height: 80 }} />
        </Avatar>
        <Button variant="text" inputMode="file" component="label">
          사진 변경하기
          <input hidden accept="image/*" multiple type="file" />
        </Button>
        <Typography component="h1" variant="h5">
          {profileContext.userName}님
        </Typography>
        <form>
          <TextField
            variant="outlined"
            margin="normal"
            requireds
            fullWidth
            id="currentPassword"
            label="비밀번호"
            type="password"
            name="currentPassword"
            placeholder="변경할 비밀번호 4자리를 입력하세요."
            pattern="[0-9]*" inputmode="numeric"
            autoComplete="password"
            onChange={handlePasswordChange}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="newPassword"
            label="비밀번호 재입력"
            placeholder="변경한 비밀번호를 한번 더 입력하세요."
            pattern="[0-9]*" inputmode="numeric"
            type="password"
            id="newPassword"
            onChange={handleNewPasswordChange}
          />
          <LoadingButton
            disabled = {!isSame}
            type="submit"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
            endIcon={<Send />}
            loading={false}
            loadingPosition="end"
            variant="contained"
            onClick={passwordChangeSubmit}
          >
            {isSame ? "비밀번호 변경하기" : "변경할 비밀번호가 일치하지 않습니다."}
          </LoadingButton>
        </form>
      </Box>
    </Container>
  );
};

export default MyInfo;
