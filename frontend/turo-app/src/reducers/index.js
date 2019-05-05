import { combineReducers } from 'redux';
import logIn from './login';
import signUp from './signup';
import global from './global';

export default combineReducers({
  logIn,
  signUp,
  global,
});
