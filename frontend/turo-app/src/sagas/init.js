import { call, takeLatest } from 'redux-saga/effects';
import loadUserData from './loadUserData';
import fetchCsrfToken from './fetchCsrfToken';

function* init() {
  yield call(fetchCsrfToken);
  yield call(loadUserData);
}

export default [
  takeLatest('INIT', init),
];
