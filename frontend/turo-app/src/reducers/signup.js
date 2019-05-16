import { combineReducers } from 'redux';

const status = (state = '', action) => {
  switch (action.type) {
    case 'SIGN_UP_SUCCESS':
      return action.message.success;
    case 'SIGN_UP_FAILURE':
      return action.message.error;
    case 'LOGIN_PAGE_LOADED':
      return '';
    default:
      return state;
  }
};

export default combineReducers({
  status,
});
