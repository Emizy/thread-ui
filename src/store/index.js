import {configureStore, combineReducers} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"
import {
    persistReducer, FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import {reducer} from "./reducer";
import {commentReducer} from "./comment/reducer";

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist: ['comment']

}

const combine_reducer = combineReducers({
    global: reducer,
    comment: commentReducer
})

const persistedReducer = persistReducer(persistConfig, combine_reducer)
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})