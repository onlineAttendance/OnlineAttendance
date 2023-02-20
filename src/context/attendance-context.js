import React, { useState, createContext, useContext, useEffect } from "react";

export const AttendanceContext = createContext();

const AttendanceContextProvider = (props) => {
  const [notAttendanceList, setNotAttendanceList] = useState([]);
  const [attendanceList, setAttendanceList] = useState([]);

  const updateNotAttendanceList = (notAttendanceList) => {
    setNotAttendanceList(notAttendanceList);
  };

  const updateAttendanceList = (attendanceList) => {
    setAttendanceList(attendanceList);
  };

  return (
    <AttendanceContext.Provider
      value={{
        notAttendanceList,
        attendanceList,
        updateNotAttendanceList,
        updateAttendanceList,
      }}
    >
      {props.children}
    </AttendanceContext.Provider>
  );
};

export default AttendanceContextProvider;