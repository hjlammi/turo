import { put, takeLatest } from 'redux-saga/effects';

function* signUp({ username, email, password }) {
  try {
    const response = yield fetch('http://localhost:4000/users/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

    const message = yield response.json();

    if (response.status === 200) {
      yield put({ type: 'SIGN_UP_SUCCESS', message });
    } else if (response.status === 409) {
      yield put({ type: 'SIGN_UP_FAILURE', message });
    } else {
      yield put({ type: 'SIGN_UP_FAILURE', message });
    }
  } catch (error) {
    yield put({ type: 'SIGN_UP_FAILURE', message: error });
  }
}

export default [
  takeLatest('SIGN_UP', signUp),
];
