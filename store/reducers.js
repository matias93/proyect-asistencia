import { combineReducers } from 'redux';
import attendanceReducer from './attendanceReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    attendance: attendanceReducer,
    user: userReducer,
});

export default rootReducer;
