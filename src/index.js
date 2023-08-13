import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter} from "react-router-dom"
import App from './App';
import {store} from "./store";
import {Provider} from 'react-redux'
import {PersistGate} from "redux-persist/integration/react";
import {persistStore} from "redux-persist";
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
const persist = persistStore(store)
root.render(
    // <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <PersistGate persistor={persist}>
                    <App/>
                </PersistGate>
            </Provider>
        </BrowserRouter>
    // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
