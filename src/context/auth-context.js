import React, { useState, createContext, useContext, useEffect } from "react";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [isLogin, setIsLogin] = useState(false);
  const [token, setToken] = useState("");

  const handleLogIn = (token) => {
    setToken(token);
    token === null ? setIsLogin(false) : setIsLogin(true);
  };
  const handleLogOut = () => {
    setIsLogin(false);
    setToken(null);
  };


  return (
    <AuthContext.Provider
      value={{
        isLogin,
        token,
        handleLogIn,
        handleLogOut,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
