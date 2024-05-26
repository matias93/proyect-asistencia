import { call, put, takeLatest } from 'redux-saga/effects';
import * as Location from 'expo-location';
import attendanceData from '../apis/attendance';

function* addRecord(action) {
    try {
        let { status } = yield call(Location.requestForegroundPermissionsAsync);
        if (status !== 'granted') {
            yield put({ type: 'ADD_RECORD_FAILURE', error: 'Se denegó el permiso para acceder a la ubicación' });
            return;
        }

        let location = yield call(Location.getCurrentPositionAsync, {});
        const newRecord = {
            ...action.payload,
            location: `Lat: ${location.coords.latitude}, Lon: ${location.coords.longitude}`,
        };

        const response = yield call(() => Promise.resolve({ data: [...attendanceData, newRecord] }));
        yield put({ type: 'ADD_RECORD_SUCCESS', payload: response.data });
    } catch (error) {
        yield put({ type: 'ADD_RECORD_FAILURE', error });
    }
}

function* attendanceSaga() {
    yield takeLatest('ADD_RECORD_REQUEST', addRecord);
}

export default attendanceSaga;
