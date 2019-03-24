import { put, takeLatest, all } from 'redux-saga/effects';

function* logIn() {
  yield put({ type: 'LOG_IN_SUCCESS' });
}

function* actionWatcher() {
  yield takeLatest('LOG_IN', logIn);
}

export default function* rootSaga() {
  yield all([
    actionWatcher(),
  ]);
}
