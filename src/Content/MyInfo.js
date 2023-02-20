import React, { useContext } from "react";
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

const MyInfo = () => {
  const authContext = useContext(AuthContext);
  const attendanceContext = useContext(AttendanceContext);
  const profileContext = useContext(ProfileContext);

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
            name="currentPassword"
            placeholder="변경할 비밀번호 4자리를 입력하세요."
            autoComplete="password"
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
            type="password"
            id="newPassword"
          />
          <LoadingButton
            type="submit"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
            endIcon={<Send />}
            loading={false}
            loadingPosition="end"
            variant="contained"
          >
            비밀번호 변경하기
          </LoadingButton>
        </form>
      </Box>
    </Container>
  );
};

export default MyInfo;
