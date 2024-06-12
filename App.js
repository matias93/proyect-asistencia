import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { Provider } from "react-redux";
import store from './src/store/index';
import { initSQLiteDB } from './src/persistence/index';

(async () => {
    try {
        const response = await initSQLiteDB();
        console.log({ responseCreatingDB: response });
        console.log("mydb initializada");
    } catch (error) {
        console.log({ errorCreatingDB: error });
    }
})();

const App = () => (
    <Provider store={store}>
        <AppNavigator />
    </Provider>
);

export default App;