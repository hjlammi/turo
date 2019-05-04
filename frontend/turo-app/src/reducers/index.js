import { combineReducers } from 'redux';
import logIn from './login';
import signUp from './signup';

export default combineReducers({
  logIn,
  signUp,
});
