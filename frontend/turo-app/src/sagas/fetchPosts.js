import { put, takeLatest, select } from 'redux-saga/effects';
import getCsrfToken from '../selectors/getCsrfToken';

function* fetchPosts() {
  const token = yield select(getCsrfToken);
  try {
    const response = yield fetch(`${process.env.REACT_APP_BACKEND_URL}/posts`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'csrf-token': token,
        },
        credentials: 'include',
        cache: 'no-store',
      });

    if (response.status === 200) {
      const posts = yield response.json();
      yield put({ type: 'FETCH_POSTS_SUCCESS', posts });
    } else {
      yield put({ type: 'FETCH_POSTS_FAILURE' });
    }
  } catch (error) {
    yield put({ type: 'FETCH_POSTS_FAILURE' });
  }
}

export default [
  takeLatest('FETCH_POSTS', fetchPosts),
];
