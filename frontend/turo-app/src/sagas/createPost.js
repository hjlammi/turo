import { put, takeLatest } from 'redux-saga/effects';
import fetchPosts from '../actions/fetchPosts';

function* createPost({ post, userId }) {
  try {
    const response = yield fetch('http://localhost:4000/posts/create',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          post,
          userId,
        }),
      });

    if (response.status === 200) {
      yield put({ type: 'CREATE_POST_SUCCESS' });
      yield put(fetchPosts());
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
