import { combineReducers } from 'redux';

const user = (state = null, action) => {
  switch (action.type) {
    case 'LOG_IN_SUCCESS':
      return action.user;
    case 'LOG_OUT_SUCCESS':
      return null;
    default:
      return state;
  }
};

export default combineReducers({
  user,
});
