import { put, takeLatest } from 'redux-saga/effects';

function* fetchPosts() {
  try {
    const response = yield fetch('http://localhost:4000/posts/all',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
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
