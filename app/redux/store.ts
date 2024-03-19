import { configureStore } from "@reduxjs/toolkit";
import PopUpUpdateReducers from "./slices/reduxPopupUpdateSlices";
import ToasterReducers from "./slices/reduxToasterSlices";
import KeywordReducers from "./slices/reduxKeywordSearchSlices";
import SelectReducers from "./slices/reduxSelectSlices";
import PopUpAddReducers from "./slices/reduxPopupAddSlices";
import PopUpDeleteReducers from "./slices/reduxPopupDeleteSlices";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
}

const reducer = combineReducers({
  popupUpdate: PopUpUpdateReducers,
  toaster: ToasterReducers,
  keyword: KeywordReducers,
  select: SelectReducers,
  popupAdd: PopUpAddReducers,
  popupDelete: PopUpDeleteReducers,
})

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false,
    })
})

console.log("On Create Store Changed : ", store.getState());

store.subscribe(() => {
  console.log("Store Changed : ", store.getState());
});

export default store;