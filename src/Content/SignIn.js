import {
  Container,
  Typography,
  Link,
  Grid,
  Button,
  TextField,
  Box,
  Avatar,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { LockOpen, Send } from "@mui/icons-material";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth-context";
import { ProfileContext } from "../context/profile-context";
import { AttendanceContext } from "../context/attendance-context";
import useHttp from "../hooks/useHttp";

const SignIn = (props) => {
  const authContext = useContext(AuthContext);
  const profileContext = useContext(ProfileContext);
  const attendanceContext = useContext(AttendanceContext);

  const { loginIsLoading, loginErrorCode ,loginError, sendRequest: loginRequest } = useHttp();
  const {
    attendanceIsLodaing,
    attendanceError,
    sendRequest: getAttendanceList,
  } = useHttp();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const updateAttendanceList = (datas) => {
    console.log("attendance", datas);
    attendanceContext.updateNotAttendanceList(datas.notAttendance);
    attendanceContext.updateAttendanceList(datas.attendance);
    profileContext.updateTeam(datas.team);
    console.log(datas.notAttendance);
  };

  const handleInitAttendanceList = (token) => {
    console.log("handleInitAttendanceList", token);
    getAttendanceList(
      {
        url: "/api/users/attendances",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
      updateAttendanceList
    );
  };

  const updateAuthContext = (data) => {
    if (data.code !== undefined) {
      console.log("Error code:", data.code);
    } else {
      props.handleClose();
      authContext.handleLogIn(data.token);
      profileContext.updateName(name);
      profileContext.updatePW(password);
      handleInitAttendanceList(data.token);
      console.log(authContext.isLogin);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    loginRequest(
      {
        url: "/api/users/login",
        method: "POST",
        body: {
          name: name,
          password: password,
        },
      },
      updateAuthContext
    );
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
        <Avatar>
          <LockOpen />
        </Avatar>
        <Typography component="h1" variant="h5">
          로그인
        </Typography>
        <form>
          <TextField
            variant="outlined"
            margin="normal"
            requireds
            fullWidth
            id="name"
            label="이름"
            name="name"
            autoComplete="name"
            autoFocus
            onChange={handleNameChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="비밀번호"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handlePasswordChange}
          />

          <LoadingButton
            type="submit"
            fullWidth
            color={loginErrorCode !== null ? "primary" : "error"}
            onClick={handleSubmit}
            sx={{ mt: 3, mb: 2 }}
            endIcon={<Send />}
            loading={loginIsLoading}
            loadingPosition="end"
            variant="contained"
          >
            로그인
          </LoadingButton>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                {"비밀번호 찾기"}
              </Link>
            </Grid>
            <Grid item>
              <Link onClick={props.handleSignUp} variant="body2">
                {"회원가입"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default SignIn;
