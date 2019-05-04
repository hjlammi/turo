import { put, takeLatest } from 'redux-saga/effects';

function* signUp({ email, password }) {
  try {
    const result = yield fetch('http://localhost:4000/users/register',
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
      yield put({ type: 'SIGN_UP_SUCCESS' });
    } else {
      yield put({ type: 'SIGN_UP_FAILURE' });
    }
  } catch (error) {
    yield put({ type: 'SIGN_UP_FAILURE' });
  }
}

export default [
  takeLatest('SIGN_UP', signUp),
];
