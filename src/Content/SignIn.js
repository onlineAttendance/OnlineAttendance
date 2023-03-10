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

  const { loginIsLoading ,loginError, sendRequest: loginRequest } = useHttp();
  const {
    attendanceIsLodaing,
    attendanceError,
    sendRequest: getAttendanceList,
  } = useHttp();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [helperText, setHelperText] = useState("");
  const [isError, setIsError] = useState(false);

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
      console.log("Error code:", loginError);
      setHelperText(data.message);
      setIsError(true);
    } else {
      props.handleClose();
      setHelperText("");
      setIsError(false);
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
          ?????????
        </Typography>
        <form>
          <TextField
            variant="outlined"
            margin="normal"
            requireds
            fullWidth
            id="name"
            label="??????"
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
            label="????????????"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handlePasswordChange}
          />

          <LoadingButton
            type="submit"
            fullWidth
            color={!isError ? "primary" : "error"}
            onClick={handleSubmit}
            sx={{ mt: 3, mb: 2 }}
            endIcon={<Send />}
            loading={loginIsLoading}
            loadingPosition="end"
            variant="contained"
          >
            {!isError ? "?????????" : helperText}
          </LoadingButton>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                {"???????????? ??????"}
              </Link>
            </Grid>
            <Grid item>
              <Link onClick={props.handleSignUp} variant="body2">
                {"????????????"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default SignIn;
