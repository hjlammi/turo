import { combineReducers } from 'redux';

const posts = (state = null, action) => {
  switch (action.type) {
    case 'FETCH_POSTS_SUCCESS':
      return action.posts;
    case 'FETCH_POSTS_FAILURE':
      return null;
    default:
      return state;
  }
};

export default combineReducers({
  posts,
});
