import React, { useState, createContext, useContext, useEffect } from "react";

export const ProfileContext = createContext();

const ProfileContextProvider = (props) => {
  const [userName, setUserName] = useState("");
  const [userPW, setUserPW] = useState("");
  const [userTeam, setUserTeam] = useState("");

  const updateName = (name) => {
    setUserName(name);
  };

  const updatePW = (pw) => {
    setUserPW(pw);
  };

  const updateTeam = (team) => {
    setUserTeam(team);
  };

  return (
    <ProfileContext.Provider
      value={{ userName, userPW, userTeam, updateName, updatePW, updateTeam }}
    >
      {props.children}
    </ProfileContext.Provider>
  );
};

export default ProfileContextProvider;
