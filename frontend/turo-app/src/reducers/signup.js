import { combineReducers } from 'redux';

const success = (state = false, action) => {
  switch (action.type) {
    case 'SIGN_UP_SUCCESS':
      return true;
    case 'SIGN_UP_FAILURE':
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  success,
});
