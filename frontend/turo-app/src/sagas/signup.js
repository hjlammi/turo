import { put, takeLatest, select } from 'redux-saga/effects';
import getCsrfToken from '../selectors/getCsrfToken';

function* signUp({ username, email, password }) {
  const token = yield select(getCsrfToken);
  try {
    const response = yield fetch(`${process.env.REACT_APP_BACKEND_URL}/users/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'csrf-token': token,
        },
        credentials: 'include',
        body: JSON.stringify({
          username,
          email,
          password,
        }),
        cache: 'no-store',
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
