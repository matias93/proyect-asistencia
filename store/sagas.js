import { all } from 'redux-saga/effects';
import attendanceSaga from './attendanceSaga';
import userSaga from './userSaga';

export default function* rootSaga() {
    yield all([
        attendanceSaga(),
        userSaga(),
    ]);
}
