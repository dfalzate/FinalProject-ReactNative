import { combineReducers } from 'redux';
import { loginReducer } from './login.reducer';
import { signupReducer } from './signup.reducer';
import { createPostReducer } from './createPost.reducer';
import { commentReducer } from './comment.reducer';
import { userReducer } from './user.reducer';
import { postReducer } from './post.reducer';

export const allReducers = combineReducers({
   loginReducer,
   signupReducer,
   createPostReducer,
   commentReducer,
   userReducer,
   postReducer,
});
