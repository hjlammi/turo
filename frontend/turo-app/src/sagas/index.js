import { all } from 'redux-saga/effects';
import loginSagas from './login';
import logOutSagas from './logOut';
import signupSagas from './signup';
import submitPostSagas from './submitPost';

export default function* rootSaga() {
  yield all([
    ...loginSagas,
    ...logOutSagas,
    ...signupSagas,
    ...submitPostSagas,
  ]);
}
