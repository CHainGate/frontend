import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { chaingateApi } from "./baseApi";

export const makeStore = () =>
  configureStore({
    reducer: {
      [chaingateApi.reducerPath]: chaingateApi.reducer,
    },
    middleware: (gDM) => gDM().concat(chaingateApi.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });