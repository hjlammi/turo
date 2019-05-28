import { put, takeLatest, select } from 'redux-saga/effects';
import getCsrfToken from '../selectors/getCsrfToken';

function* logIn({ email, password }) {
  const token = yield select(getCsrfToken);
  try {
    const response = yield fetch(`${process.env.REACT_APP_BACKEND_URL}/users/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'csrf-token': token,
        },
        credentials: 'include',
        body: JSON.stringify({
          email,
          password,
        }),
        cache: 'no-store',
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
