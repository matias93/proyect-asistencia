import { configureStore, createReducer } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query"
import rootReducer from './reducers';
import authReducer from '../features/authSlice';
import { userApi } from '../services/userInformation';
import {authApi} from '../services/authService';

const store = configureStore({
    reducer: {
        user: rootReducer,
        auth: authReducer,
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




/* import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

const StoreProvider = ({ children }) => (
    <Provider store={store}>{children}</Provider>
);

export default StoreProvider; */
