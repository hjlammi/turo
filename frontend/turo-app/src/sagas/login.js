import { put, takeLatest, all } from 'redux-saga/effects';

function* logIn({ username, password }) {
  try {
    const result = yield fetch('http://localhost:4000/users/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
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

function* watchLogIn() {
  yield takeLatest('LOG_IN', logIn);
}

export default function* rootSaga() {
  yield all([
    watchLogIn(),
  ]);
}
