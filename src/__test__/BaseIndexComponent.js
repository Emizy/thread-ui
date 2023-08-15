import {store} from "../store";
import {Provider} from 'react-redux'
import {PersistGate} from "redux-persist/integration/react";
import {persistStore} from "redux-persist";
import {BrowserRouter} from "react-router-dom";
import React from "react";

const persist = persistStore(store)
export const BaseIndexComponent = ({childComponent}) => {
    return (
        <div>
            <BrowserRouter>
                <Provider store={store}>
                    <PersistGate persistor={persist}>
                        {childComponent}
                    </PersistGate>
                </Provider>
            </BrowserRouter>
        </div>
    )
}