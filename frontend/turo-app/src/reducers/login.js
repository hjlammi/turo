import { combineReducers } from 'redux';

const failed = (state = false, action) => {
  switch (action.type) {
    case 'LOG_IN_SUCCESS':
      return false;
    case 'LOG_IN_FAILURE':
      return true;
    default:
      return state;
  }
};

const isLoggedIn = (state = false, action) => {
  switch (action.type) {
    case 'LOG_IN_SUCCESS':
      return true;
    case 'LOG_IN_FAILURE':
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  failed,
  isLoggedIn,
});
