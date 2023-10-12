import {
  configureStore,
  ThunkAction,
  Action,
  getDefaultMiddleware,
  combineReducers,
} from "@reduxjs/toolkit"
import charityReducer from "../features/charity/charitySlice"
import favouriteCharityReducer from "../features/charity/favouriteCharitySlice"

import storage from "redux-persist/lib/storage"
import { persistReducer, persistStore } from "redux-persist"

const persistConfig = {
  key: "root",
  storage,
}

const rootReducer = combineReducers({
  charityReducer,
  favouriteCharityReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
})
export const store = configureStore({
  reducer: persistedReducer,
  middleware: customizedMiddleware,
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type CharatiesState = ReturnType<typeof charityReducer>
export type FavouriteCharatiesState = ReturnType<typeof favouriteCharityReducer>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export const persistor = persistStore(store)
