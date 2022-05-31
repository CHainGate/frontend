import {Action, combineReducers, configureStore} from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { chaingateApi } from "./baseApi";
import internalReducer, {clearUser} from './authInfo/reducers';


const appReducer = combineReducers({
    internal: internalReducer,
    [chaingateApi.reducerPath]: chaingateApi.reducer,
});

export const makeStore: any = (state: Partial<RootState> = {}) =>
  configureStore({
    reducer: rootReducer,
    preloadedState: state,
    middleware: (gDM) => gDM().concat(chaingateApi.middleware),
  });


const rootReducer = (state: any, action: Action<any>) => {
    if (clearUser.match(action)) {
        state = undefined;
    }
    return appReducer(state, action);
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });

