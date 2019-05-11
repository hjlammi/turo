import { combineReducers } from 'redux';

const user = (state = null, action) => {
  switch (action.type) {
    case 'GET_USERDATA_SUCCESS':
    case 'LOG_IN_SUCCESS':
      return action.user;
    case 'GET_USERDATA_FAILURE':
    case 'LOG_OUT_SUCCESS':
      return null;
    default:
      return state;
  }
};

export default combineReducers({
  user,
});
