import { all } from 'redux-saga/effects';
import loginSagas from './login';
import signupSagas from './signup';

export default function* rootSaga() {
  yield all([
    ...loginSagas,
    ...signupSagas,
  ]);
}
