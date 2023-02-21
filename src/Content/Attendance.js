import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  Box,
  Grid,
  Paper,
  TextField,
  Typography,
  List,
  ListItemAvatar,
  Avatar,
  ListItem,
  ListItemText,
} from "@mui/material";
import useHttp from "../hooks/useHttp";
import { AuthContext } from "../context/auth-context";
import { AttendanceContext } from "../context/attendance-context";
import { ProfileContext } from "../context/profile-context";

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex", width:1, justifyContent:"center", mt:2, mb:2}}>
      <CircularProgress variant="determinate" {...props} size={80}/>
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary" sx={{fontSize:20}}>
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

const Attendance = () => {
  const authContext = useContext(AuthContext);
  const attendanceContext = useContext(AttendanceContext);
  const profileContext = useContext(ProfileContext);
  const [value, setValue] = useState(0);
  const [attendanceCode, setAttendanceCode] = useState("");
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const {
    attendanceIsLodaing,
    attendanceError,
    sendRequest: postAttendanceRequest,
  } = useHttp();

  useEffect(() => {
    setValue(
      (attendanceContext.attendanceList.length /
        (attendanceContext.notAttendanceList.length +
          attendanceContext.attendanceList.length)) *
        100
    );
    handleInitAttendanceList();
  }, [attendanceContext.attendanceList, attendanceContext.notAttendanceList]);

  // 테스트 전용 함수
  const handleInitAttendanceList = () => {
    console.log("업데이트 된다!");
    console.log("토큰: ", authContext.token);
    console.log("이름: ", profileContext.userName);
    console.log("비밀번호: ", profileContext.userPW);
    console.log("팀명: ", profileContext.userTeam);
    console.log("출석자: ", attendanceContext.attendanceList.length);
    console.log("미출석: ", attendanceContext.notAttendanceList.length);
    console.log(value);
  };

  const updateAttendanceList = (datas) => {
    console.log("attendance", datas);
    attendanceContext.updateNotAttendanceList(datas.notAttendance);
    attendanceContext.updateAttendanceList(datas.attendance);
    profileContext.updateTeam(datas.team);
    console.log("NotattendanceList : ", attendanceContext.notAttendance);
  };

  const handleAttendanceCodeSubmit = () => {
    postAttendanceRequest(
      {
        url: "/api/users/attendances",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authContext.token}`,
        },
        body: { password: attendanceCode },
      },
      updateAttendanceList
    );
  };

  const handleAttendanceCode = (e) => {
    setAttendanceCode(e.target.value);
    if (e.target.value.length > 4) {
      setError(true);
      setHelperText("출석코드는 4자리입니다.");
    } else {
      setError(false);
      setHelperText(null);
    }
  };
  return (
    <Paper>
      <Grid container>
        <Grid item sx={{ flexGrow: 1 }}>
          <TextField
            label="출석코드"
            error={error}
            helperText={helperText}
            fullWidth
            onChange={handleAttendanceCode}
          />
        </Grid>
        <Grid item xs={3}>
          <Button
            sx={{ height: 1 }}
            variant="contained"
            onClick={handleAttendanceCodeSubmit}
          >
            출석하기
          </Button>
        </Grid>

        <Grid item xs={12}>
          <CircularProgressWithLabel value={value} />
        </Grid>
        <Grid item xs={12}>
          <Grid container rowSpacing={1} sx={{backgroundColor:"#1976D2", borderRadius:"5px"}}>
            <Grid
              item
              xs={12}
              sx={{
                textAlign: "center",
              }}
            >
              <Paper variant="h6" sx={{ backgroundColor: "#FFF", m: 1, p:1}}>
                {profileContext.userTeam}
              </Paper>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{
                textAlign: "center",
              }}
            >
              <Paper variant="h6" sx={{ backgroundColor: "#FFF", m: 1,p:1 }}>
                미출석
              </Paper>
              <Paper sx={{ m: 1 }}>
                <List>
                  {attendanceContext.notAttendanceList.map((item) => (
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar alt={item.name} src={item.image} />
                      </ListItemAvatar>
                      <ListItemText>{item.name}</ListItemText>
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{
                textAlign: "center",
                boxSizing: "border-box",
              }}
            >
              <Paper variant="h6" sx={{ backgroundColor: "#FFF", m: 1,p:1 }}>
                출석자
              </Paper>
              <Paper sx={{ m: 1 }}>
                <List>
                  {attendanceContext.attendanceList.map((item) => (
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar alt={item.name} src={item.image} />
                      </ListItemAvatar>
                      <ListItemText>{item.name}</ListItemText>
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Attendance;
