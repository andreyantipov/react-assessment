import { useReducer, createContext, useMemo } from "react";
import { combineReducers } from "app/utils";

// features
import { weatherSearch } from "features/weatherSearch/weatherSearch.feature";

export type RootState = {
  weather: any
};

const rootReducer = combineReducers({
  weather: weatherSearch.reducer,
});

const initialState: RootState = {
  weather: weatherSearch.initialState,
};

type AppStoreContext = [
  state: RootState,
  dispatch: any
]

export const AppStore = createContext<AppStoreContext>({} as any);

export const AppStoreProvider: FCC = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  const store = useMemo<AppStoreContext>(() => [state, dispatch], [state]);

  return <AppStore.Provider value={store}>{children}</AppStore.Provider>;
};
