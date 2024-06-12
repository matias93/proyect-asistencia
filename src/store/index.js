import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query"
import userReducer from '../features/userSlice';
import authReducer from '../features/authSlice';
import taskReducer from '../features/taskSice';
import { userApi } from '../services/userInformation';
import {authApi} from '../services/authService';

const store = configureStore({
    reducer: {
        user: userReducer,
        auth: authReducer,
        task: taskReducer,
        [userApi.reducerPath]: userApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(userApi.middleware)
            .concat(authApi.middleware)
})

setupListeners(store.dispatch)

export default store





