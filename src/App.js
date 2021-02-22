import React from "react"
import AppRouter from "./App/Root/AppRouter";
import Store from "./App/Redux/Store";
import {Provider} from 'react-redux';

function App() {
    return (
        <Provider store={Store}>
            <AppRouter/>
        </Provider>
    )
}

export default App
