import React, { createContext, useReducer } from "react";
import DecodeToken from "jwt-decode";

const initialState = { user: null };

if (localStorage.getItem("receivedToken")) {
  const decodedToken = DecodeToken(localStorage.getItem("receivedToken"));
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("receivedToken");
  } else {
    //this condition will be true unless the token expires
    initialState.user = decodedToken; // decoded token contain the user information
  }
}

const AuthContext = createContext({
  user: null,
  login: userData => {},
  logout: () => {}
});

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload
      };
    case "LOGOUT":
      return {
        ...state,
        user: null
      };
    default: {
      return state;
    }
  }
};

const AuthProvider = props => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = userData => {
    localStorage.setItem("receivedToken", userData.token);
    dispatch({
      type: "LOGIN",
      payload: userData
    });
  };

  const logout = () => {
    localStorage.removeItem("receivedToken");
    dispatch({
      type: "LOGOUT"
    });
  };

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
};

export { AuthContext, AuthProvider };
