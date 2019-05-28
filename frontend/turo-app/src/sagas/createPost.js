import { put, takeLatest, select } from 'redux-saga/effects';
import fetchPosts from '../actions/fetchPosts';
import getCsrfToken from '../selectors/getCsrfToken';

function* createPost({ post, userId }) {
  const token = yield select(getCsrfToken);
  try {
    const response = yield fetch(`${process.env.REACT_APP_BACKEND_URL}/posts`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'csrf-token': token,
        },
        credentials: 'include',
        body: JSON.stringify({
          post,
          userId,
        }),
        cache: 'no-store',
      });

    if (response.status === 200) {
      yield put({ type: 'CREATE_POST_SUCCESS' });
      yield put(fetchPosts());
    } else if (response.status === 413) {
      yield put({ type: 'TOO_LONG_POST' });
    } else {
      yield put({ type: 'CREATE_POST_FAILURE' });
    }
  } catch (error) {
    yield put({ type: 'CREATE_POST_FAILURE' });
  }
}

export default [
  takeLatest('CREATE_POST', createPost),
];
