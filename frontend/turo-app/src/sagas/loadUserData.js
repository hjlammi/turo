import { put, takeLatest } from 'redux-saga/effects';

function* loadUserData() {
  try {
    const response = yield fetch('http://localhost:4000/users/me',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
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
