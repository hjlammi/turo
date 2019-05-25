import { put, takeLatest, select } from 'redux-saga/effects';
import getCsrfToken from '../selectors/getCsrfToken';

function* loadUserData() {
  const token = yield select(getCsrfToken);
  try {
    const response = yield fetch(`${process.env.REACT_APP_BACKEND_URL}/users/me`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'csrf-token': token,
        },
        credentials: 'include',
      });

    if (response.status === 200) {
      const user = yield response.json();
      yield put({ type: 'GET_USERDATA_SUCCESS', user });
    } else {
      yield put({ type: 'GET_USERDATA_FAILURE' });
    }
  } catch (error) {
    yield put({ type: 'GET_USERDATA_FAILURE' });
  }
}

export default [
  takeLatest('LOAD_USER_DATA', loadUserData),
];
