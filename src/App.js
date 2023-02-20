import AppContainer from "./UI/AppContainer";
import AuthContextProvider from "./context/auth-context";
import PostContextProvider from "./context/post-context";
import AttendanceContextProvider from "./context/attendance-context";
import ProfileContextProvider from "./context/profile-context";
import "./App.css";

function App() {
  return (
    <AuthContextProvider>
      <ProfileContextProvider>
        <PostContextProvider>
          <AttendanceContextProvider>
            <AppContainer></AppContainer>
          </AttendanceContextProvider>
        </PostContextProvider>
      </ProfileContextProvider>
    </AuthContextProvider>
  );
}

export default App;
