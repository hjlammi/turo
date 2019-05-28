import { put } from 'redux-saga/effects';

export default function* fetchCsrfToken() {
  try {
    const response = yield fetch(`${process.env.REACT_APP_BACKEND_URL}/csrf-token`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'text/plain',
        },
        credentials: 'include',
        cache: 'no-store',
      });

    if (response.status === 200) {
      const csrfToken = yield response.text();
      yield put({ type: 'FETCH_CSRF_TOKEN_SUCCESS', csrf_token: csrfToken });
    } else {
      yield put({ type: 'FETCH_CSRF_TOKEN_FAILURE' });
    }
  } catch (error) {
    yield put({ type: 'FETCH_CSRF_TOKEN_FAILURE' });
  }
}
