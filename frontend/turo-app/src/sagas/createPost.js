import { put, takeLatest } from 'redux-saga/effects';

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
