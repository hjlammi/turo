import { put, takeLatest } from 'redux-saga/effects';
import loadUserData from '../actions/loadUserData';

function* init() {
  yield put(loadUserData());
}

export default [
  takeLatest('INIT', init),
];
