import {
  Action,
  configureStore,
  createAction,
  ThunkAction,
} from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import appReducer from "./reducer";

const rootReducer = (state: any, action: any) => {
  if (action.type === "RESET_APP") {
    state = {
      user: state.user,
    };
  }

  if (action.type === "RESET_LOADING") {
    const {
      payload: { reducer, loadingKey },
    } = action;
    state = {
      ...state,
      [reducer]: {
        ...state[reducer],
        [loadingKey]: "idle",
      },
    };
  }

  return appReducer(state, action);
};
export type ResetLoadingType = {
  reducer: keyof AppState;
  loadingKey: string;
};
export const resetLoading = createAction<ResetLoadingType>("RESET_LOADING");
const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.REACT_APP_ENV === "development",
});
export type AppState = ReturnType<typeof appReducer>;
export type AppDispatch = typeof store.dispatch;
export const resetAppStore = createAction("RESET_APP");
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <T extends (state: AppState) => any>(
  selector: T
): ReturnType<T> => useSelector(selector);
export type StoreType = typeof store;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;
export default store;
