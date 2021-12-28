import React, { useReducer } from "react";
 
let user = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).user
  : "";
let token = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).token
  : "";
 
export const initialState = {
  user: "" || user,
  token: "" || token,
  loading: false,
  errorMessage: ""
};
 
export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case "REQUEST_LOGIN":
      return {
        ...initialState,
        loading: true
      };
    case "LOGIN_SUCCESS":
      return {
        ...initialState,
        user: action.payload.user,
        token: action.payload.token,
        loading: false
      };
    case "LOGOUT":
      return {
        ...initialState,
        user: null,
        token: null
      };
 
    case "LOGIN_ERROR":
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error
      };

    case "REQUEST_SIGNUP":
        return {
          ...initialState,
          loading: true
        };

    case "SIGNUP_SUCCESS":
        return {
            ...initialState,
            user: action.payload.user,
            token: action.payload.token,
            loading: false
        };
   
    case "SIGNUP_ERROR":
        return {
          ...initialState,
          loading: false,
          errorMessage: action.error
        };
 
    case "UPDATE_USER":
        return {
            ...initialState,
            user: action.payload.user,
            token: action.payload.token,
            loading: false
        };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};