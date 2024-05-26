import { all } from 'redux-saga/effects';
import watchDataUserSaga from '../userSaga';

export default function* rootSaga() {
    yield all([
        watchDataUserSaga(),
    ]);
}
