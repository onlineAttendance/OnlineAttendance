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
  FormControl,
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
    { team: "복덕방" },
    { team: "복통" },
    { team: "복권" },
    { team: "또복" },
    { team: "복덕복" },
  ];

  const yearList = [
    { year: "90" },
    { year: "91" },
    { year: "92" },
    { year: "93" },
    { year: "94" },
    { year: "95" },
    { year: "96" },
    { year: "97" },
    { year: "98" },
    { year: "99" },
    { year: "00" },
    { year: "01" },
    { year: "02" },
    { year: "03" },
    { year: "04" },
    { year: "05" },
    { year: "06" },
  ];
  const monthList = [
    { month: "01" },
    { month: "02" },
    { month: "03" },
    { month: "04" },
    { month: "05" },
    { month: "06" },
    { month: "07" },
    { month: "08" },
    { month: "09" },
    { month: "10" },
    { month: "11" },
    { month: "12" },
  ];

  const dayList = [
    { day: "01" },
    { day: "02" },
    { day: "03" },
    { day: "04" },
    { day: "05" },
    { day: "06" },
    { day: "07" },
    { day: "08" },
    { day: "09" },
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
    let birth = year + "." + month + "." + day;
    console.log(birth);
  };

  const updateAuthContext = (data) => {
    props.handleClose();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    loginRequest(
      {
        url: "/api/users/signup",
        method: "POST",
        body: {
          name: name,
          password: password,
          birth: year + "." + month + "." + day +".",
          team: team,
          faceImageFile: "default.png",
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

          <Grid container>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <Select
                  label="년"
                  sx={{ flexGrow: 1 }}
                  value={year}
                  onChange={handleYearChange}
                >
                  {yearList.map((item) => (
                    <MenuItem value={item.year}>{item.year}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <Select
                  label="월"
                  sx={{ flexGrow: 1 }}
                  value={month}
                  onChange={handleMonthChange}
                >
                  {monthList.map((item) => (
                    <MenuItem value={item.month}>{item.month}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <Select
                  label="일"
                  sx={{ flexGrow: 1 }}
                  value={day}
                  onChange={handleDayChange}
                >
                  {dayList.map((item) => (
                    <MenuItem value={item.day}>{item.day}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <LoadingButton
            type="submit"
            disabled={isRequired}
            fullWidth
            onClick={handleSubmit}
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
              <Link onClick={props.handleCloseSignUp} variant="body2">
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
