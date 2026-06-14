
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import {
  persistStore,
  persistReducer,
} from "redux-persist";

import storage from "redux-persist/lib/storage";
import { transactionReducer } from "../store/reducer/transactionReducer";
const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  userReducer
);
export const store = configureStore({
  reducer: {
    user: persistedReducer,
    transactions:transactionReducer
  }
});

export const persistor = persistStore(store);