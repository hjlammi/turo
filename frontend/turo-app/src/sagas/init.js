import { put, takeLatest } from 'redux-saga/effects';
import loadUserData from '../actions/loadUserData';
import fetchCsrfToken from '../actions/fetchCsrfToken';

function* init() {
  yield put(loadUserData());
  yield put(fetchCsrfToken());
}

export default [
  takeLatest('INIT', init),
];
