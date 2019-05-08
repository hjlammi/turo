import { put, takeLatest } from 'redux-saga/effects';

function* submitPost({ post }) {
  try {
    const response = yield fetch('http://localhost:4000/posts/submit',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          post,
        }),
      });

    if (response.status === 200) {
      const user = yield response.json();
      yield put({ type: 'SUBMIT_POST_SUCCESS', user });
    } else {
      yield put({ type: 'SUBMIT_POST_FAILURE' });
    }
  } catch (error) {
    yield put({ type: 'SUBMIT_POST_FAILURE' });
  }
}

export default [
  takeLatest('SUBMIT_POST', submitPost),
];
