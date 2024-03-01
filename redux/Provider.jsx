"use client";
import { Provider } from "react-redux";
import Store from "@/redux/Store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

const persistor = persistStore(Store);

export default function ReduxProvider({ children }) {
  return (
    <PersistGate persistor={persistor}>
      <Provider store={Store}>{children}</Provider>
    </PersistGate>
  );
}
