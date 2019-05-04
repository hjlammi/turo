import { put, takeLatest } from 'redux-saga/effects';

function* logIn({ email, password }) {
  try {
    const result = yield fetch('http://localhost:4000/users/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

    if (result.status === 200) {
      yield put({ type: 'LOG_IN_SUCCESS' });
    } else {
      yield put({ type: 'LOG_IN_FAILURE' });
    }
  } catch (error) {
    yield put({ type: 'LOG_IN_FAILURE' });
  }
}

export default [
  takeLatest('LOG_IN', logIn),
];
