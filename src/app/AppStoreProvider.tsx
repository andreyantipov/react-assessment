import { useReducer, createContext, useMemo } from "react";
import { combineReducers } from "app/utils";

// features
import weather, {
  WeatherSearchState,
  weatherSearchReducer,
} from "features/weatherSearch/weatherSearch.slice";

export type RootState = {
  weather: WeatherSearchState;
};

const rootReducer = combineReducers({
  weather: weatherSearchReducer,
});

const initialState: RootState = {
  weather,
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
