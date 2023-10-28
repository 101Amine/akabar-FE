import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import authReducer from './authSlice';
import clientReducer from './clientSlice';
import uiReducer from './uiSlice';
import affaireReducer from './affaireSlice';

const rootReducer = combineReducers({
  user: userReducer,
  client: clientReducer,
  auth: authReducer,
  ui: uiReducer,
  affaire: affaireReducer,
});

export default rootReducer;
