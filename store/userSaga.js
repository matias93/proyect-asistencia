import { call, put, takeLatest } from 'redux-saga/effects';
import { collection, getDocs } from 'firebase/firestore';
import { db } from  '../utils/credentialsFire';
import {
    fetchDataUserRequest,
    fetchDataUserSuccess,
    fetchDataUserFailure,
} from './userReducer';

function* fetchDataUserSaga() {
    try {
        const querySnapshot = yield call(getDocs, collection(db, 'datauser'));
        const data = querySnapshot.docs.map(doc => doc.data());
        yield put(fetchDataUserSuccess(data));
    } catch (error) {
        yield put(fetchDataUserFailure(error.message));
    }
}

export default function* watchDataUserSaga() {
    yield takeLatest(fetchDataUserRequest.type, fetchDataUserSaga);
}

