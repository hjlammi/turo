import { put, takeLatest } from 'redux-saga/effects';

function* logIn({ email, password }) {
  try {
    const response = yield fetch('http://localhost:4000/users/login',
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

    if (response.status === 200) {
      const user = yield response.json();
      yield put({ type: 'LOG_IN_SUCCESS', user });
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
