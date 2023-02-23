import {
  Container,
  Typography,
  Link,
  Grid,
  Button,
  TextField,
  Box,
  MenuItem,
  Autocomplete,
  Avatar,
  Select,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { LockOpen, Send } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth-context";
import { ProfileContext } from "../context/profile-context";
import { AttendanceContext } from "../context/attendance-context";
import useHttp from "../hooks/useHttp";

const SignUp = (props) => {
  const teamList = [
    { team: "복통" },
    { team: "두통" },
    { team: "머리아픔" },
    { team: "배고픔" },
    { team: "피곤함" },
    { team: "기타" },
  ];

  const yearList = [
    { year: "1990" },
    { year: "1991" },
    { year: "1992" },
    { year: "1993" },
    { year: "1994" },
    { year: "1995" },
    { year: "1996" },
    { year: "1997" },
    { year: "1998" },
    { year: "1999" },
    { year: "2000" },
    { year: "2001" },
    { year: "2002" },
    { year: "2003" },
    { year: "2004" },
    { year: "2005" },
    { year: "2006" },
  ];
  const monthList = [
    { month: "1" },
    { month: "2" },
    { month: "3" },
    { month: "4" },
    { month: "5" },
    { month: "6" },
    { month: "7" },
    { month: "8" },
    { month: "9" },
    { month: "10" },
    { month: "11" },
    { month: "12" },
  ];

  const dayList = [
    { day: "1" },
    { day: "2" },
    { day: "3" },
    { day: "4" },
    { day: "5" },
    { day: "6" },
    { day: "7" },
    { day: "8" },
    { day: "9" },
    { day: "10" },
    { day: "11" },
    { day: "12" },
    { day: "13" },
    { day: "14" },
    { day: "15" },
    { day: "16" },
    { day: "17" },
    { day: "18" },
    { day: "19" },
    { day: "20" },
    { day: "21" },
    { day: "22" },
    { day: "23" },
    { day: "24" },
    { day: "25" },
    { day: "26" },
    { day: "27" },
    { day: "28" },
    { day: "29" },
    { day: "30" },
    { day: "31" },
  ];

  const [isRequired, setIsRequired] = useState(true);
  const [isSame, setIsSame] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [team, setTeam] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  const authContext = useContext(AuthContext);
  const profileContext = useContext(ProfileContext);
  const attendanceContext = useContext(AttendanceContext);

  const { loginIsLoading, loginError, sendRequest: loginRequest } = useHttp();
  const {
    attendanceIsLodaing,
    attendanceError,
    sendRequest: getAttendanceList,
  } = useHttp();

  useEffect(() => {
    if (password === rePassword) {
      setIsSame(true);
    } else {
      setIsSame(false);
    }
  }, [rePassword]);

  useEffect(() => {
    if (name === "" || password === "" || rePassword === "" || team === "") {
      setIsRequired(true);
    } else {
      setIsRequired(false);
    }
  }, [name, password, rePassword, team]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleRePasswordChange = (event) => {
    setRePassword(event.target.value);
  };
  const handleYearChange = (event) => {
    setYear(event.target.value);
  };
  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };
  const handleDayChange = (event) => {
    setDay(event.target.value);
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
        url: "/api/users/signup",
        method: "POST",
        body: {
          name: name,
          password: password,
          team: team,
        },
      },
      updateAttendanceList
    );
  };

  const TestData = (event) => {
    event.preventDefault();
    console.log(name);
    console.log(password);
    console.log(rePassword);
    console.log(team);
  };

  const updateAuthContext = (data) => {
    props.handleClose();
    authContext.handleLogIn(data.token);
    profileContext.updateName(name);
    profileContext.updatePW(password);

    handleInitAttendanceList(data.token);

    console.log(authContext.isLogin);
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
          회원가입
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
            placeholder="비밀번호를 입력하세요."
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handlePasswordChange}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="비밀번호 재입력"
            placeholder="비밀번호를 한번 더 입력하세요."
            error={!isSame}
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleRePasswordChange}
          />
          <Autocomplete
            id="team"
            options={teamList}
            getOptionLabel={(option) => option.team}
            renderInput={(params) => (
              <TextField {...params} label="팀" variant="outlined" />
            )}
            onChange={(event, value) => {
              setTeam(value.team);
            }}
          />

          <Select label="년" value={yearList} onChange={handleYearChange}>
            {yearList.map((item) => (
              <MenuItem value={item.year}>{item.year}</MenuItem>
            ))}
          </Select>
          <Select label="월" value={monthList} onChange={handleMonthChange}>
            {monthList.map((item) => (
              <MenuItem value={item.month}>{item.month}</MenuItem>
            ))}
          </Select>
          <Select label="일" value={dayList} onChange={handleDayChange}>
            {dayList.map((item) => (
              <MenuItem value={item.day}>{item.day}</MenuItem>
            ))}
          </Select>

          <LoadingButton
            type="submit"
            disabled={isRequired}
            fullWidth
            onClick={TestData}
            sx={{ mt: 3, mb: 2 }}
            endIcon={<Send />}
            loading={loginIsLoading}
            loadingPosition="end"
            variant="contained"
          >
            회원가입
          </LoadingButton>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                {"비밀번호 찾기"}
              </Link>
            </Grid>
            <Grid item>
              <Link onClick={props.handleSignUp} variant="body2">
                {"로그인"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default SignUp;
