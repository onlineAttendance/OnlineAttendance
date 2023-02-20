import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import {Book, DomainVerification} from '@mui/icons-material';

const BottomNav = (props) => {
  
    const handleChange = (event, newValue) => {
        props.handleBottomNavClick(newValue);
    };

    return (
    <BottomNavigation
      sx={{ width: "100%", position: "fixed", bottom: 0 }}
      showLabels
      value={props.isAttendance ? 1 : 0}
        onChange={handleChange}
    >
      <BottomNavigationAction label="오늘의 말씀" icon={<Book />} />
      <BottomNavigationAction label="출석 체크" icon={<DomainVerification />} />
    </BottomNavigation>
  );
};

export default BottomNav;
