import { put, takeLatest } from 'redux-saga/effects';

function* logOut() {
  try {
    const response = yield fetch('http://localhost:4000/users/logout',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

    if (response.status === 200) {
      yield put({ type: 'LOG_OUT_SUCCESS' });
    } else {
      yield put({ type: 'LOG_OUT_FAILURE' });
    }
  } catch (error) {
    yield put({ type: 'LOG_OUT_FAILURE' });
  }
}

export default [
  takeLatest('LOG_OUT', logOut),
];
