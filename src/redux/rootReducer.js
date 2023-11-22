import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import authReducer from './authSlice';
import clientReducer from './clientSlice';
import uiReducer from './uiSlice';
import affaireReducer from './affaireSlice';
import agentReducer from './agentSlice';
import articleReducer from './articleSlice';
import devisReducer from './devisSlice';

const rootReducer = combineReducers({
  user: userReducer,
  client: clientReducer,
  auth: authReducer,
  ui: uiReducer,
  affaire: affaireReducer,
  agent: agentReducer,
  article: articleReducer,
  devis: devisReducer,
});

export default rootReducer;
