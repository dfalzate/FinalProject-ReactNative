import { combineReducers } from 'redux';
import { commonReducer } from './common.reducer.js';
import { loginReducer } from './login.reducer';
import { signupReducer } from './signup.reducer';
import { createPostReducer } from './createPost.reducer';

export const allReducers = combineReducers({
  commonReducer,
  loginReducer,
  signupReducer,
  createPostReducer,
});
