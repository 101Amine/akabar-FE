import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import authReducer from './authSlice';
import clientReducer from './clientSlice';


const rootReducer = combineReducers({
  user: userReducer,
  client: clientReducer,
  auth: authReducer
});

export default rootReducer;