import { all } from 'redux-saga/effects';
import loginSagas from './login';
import logOutSagas from './logOut';
import signupSagas from './signup';
import createPostSagas from './createPost';
import fetchPostsSagas from './fetchPosts';
import loadUserDataSagas from './loadUserData';

export default function* rootSaga() {
  yield all([
    ...loginSagas,
    ...logOutSagas,
    ...signupSagas,
    ...createPostSagas,
    ...fetchPostsSagas,
    ...loadUserDataSagas,
  ]);
}
