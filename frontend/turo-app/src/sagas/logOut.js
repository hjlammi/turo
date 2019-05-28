import { put, takeLatest, select } from 'redux-saga/effects';
import getCsrfToken from '../selectors/getCsrfToken';

function* logOut() {
  const token = yield select(getCsrfToken);
  try {
    const response = yield fetch(`${process.env.REACT_APP_BACKEND_URL}/users/logout`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'csrf-token': token,
        },
        credentials: 'include',
        cache: 'no-store',
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
