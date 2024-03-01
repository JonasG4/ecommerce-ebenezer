import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/redux/cart";
import searchReducer from "@/redux/search";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cartState", "searchState"],
};

const rootReducer = combineReducers({
  cartState: cartReducer,
  searchState: searchReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const Store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export default Store;
