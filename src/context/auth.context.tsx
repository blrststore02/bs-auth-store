"use client";
import { createContext, useState } from "react";

const AuthContext = createContext({});
const { Provider } = AuthContext;

const AuthProvider = ({ children }: { children: any }) => {
  const [authState, setAuthState] = useState({
    token: "",
  });

  const setUserAuthInfo = ({ data }: { data: any }) => {
    localStorage.setItem("token", data.data);
    const token = localStorage.getItem("token") as string;
    setAuthState({
      token,
    });
  };

  // checks if the user is authenticated or not
  const isUserAuthenticated = () => {
    if (!authState.token) {
      return false;
    }
  };

  return (
    <Provider value={{ authState, setAuthState: (userAuthInfo: { data: any; }) => setUserAuthInfo(userAuthInfo), isUserAuthenticated }}>
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };