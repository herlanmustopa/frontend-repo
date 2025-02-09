import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/userSilces";
import authReducer from "./slices/authSlices";

const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
});

export default rootReducer;
