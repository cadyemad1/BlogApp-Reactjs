import { combineReducers } from 'redux';

import authReducer from './Auth';
import blogReducer from './Blogs';
const rootReducer = combineReducers({
  authUser: authReducer,
  blogs: blogReducer
});

export default rootReducer;
