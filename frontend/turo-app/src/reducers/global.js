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

const csrfToken = (state = null, action) => {
  switch (action.type) {
    case 'FETCH_CSRF_TOKEN_SUCCESS':
      return action.csrf_token;
    case 'FETCH_CSRF_TOKEN_FAILURE':
      return null;
    default:
      return state;
  }
};

const isUserLoaded = (state = false, action) => {
  switch (action.type) {
    case 'GET_USERDATA_SUCCESS':
    case 'GET_USERDATA_FAILURE':
      return true;
    default:
      return state;
  }
};

export default combineReducers({
  user,
  csrfToken,
  isUserLoaded,
});
