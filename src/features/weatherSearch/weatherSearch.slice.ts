type CitySuggestion = {
  name: string;
  label_en: string;
  coordinates: [number, number];
}

type Forecast = {
  [cityId: number]: {
    temperature: number
  }
}

type State = {
  dirtyState: {
    search: string
    focused: boolean
    selectedItemId: number
  }
  suggestions: CitySuggestion[]
  forecast: Forecast
}

const initialState: State = {
  dirtyState: {
    search: "",
    focused: false,
    selectedItemId: 0,
  },
  suggestions: [],
  forecast: {}
};

enum Action {
  SET_SEARCH_TEXT = 'SET_SEARCH_TEXT',
  SET_SEARCHBAR_FOCUS = 'SET_SEARCHBAR_FOCUS',
  SET_SELECTED_ITEM_ID = 'SET_SELECTED_ITEM_ID',
  SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS',
  ADD_OR_UPDATE_FORECAST = 'ADD_OR_UPDATE_FORECAST',
  RESET_FORECAST = 'RESET_FORECAST',
  RESET = 'RESET'
}

// refactor as useStore hook
// type ActionsMap<A> = {
//   [K in keyof A]: A[K] extends Record<keyof A[K], (...arg: never[]) => infer R> ? R : never;
// }[keyof A];
// export type TRootActions = ActionsMap<typeof rootActions>;
// export type TRootReducer<S = State, A = TRootActions> = Reducer<S, A>;

// refactor
type ActionPayload =
  & ReturnType<typeof selectItemId>
  & ReturnType<typeof setSearchResults>
  & ReturnType<typeof addOrUpdateForecast>
  & ReturnType<typeof reset>

// reducer 
function reducer(state: State, action: ActionPayload): State {
  switch (action.type) {
    case Action.SET_SEARCH_TEXT:
      return {
        ...state,
        dirtyState: {
          ...state.dirtyState,
          // @ts-ignore
          search: action.payload
        }
      }
    case Action.SET_SELECTED_ITEM_ID:
      return {
        ...state,
        dirtyState: {
          ...state.dirtyState,
          // @ts-ignore
          selectedItemId: action.payload
        }
      }
    case Action.RESET_FORECAST:
      return {
        ...state,
        forecast: []
      }
    case Action.ADD_OR_UPDATE_FORECAST:
      return {
        ...state,
        forecast: {
          ...state.forecast,
          [action.payload.cityId]: {
            temperature: action.payload.temperature
          }
        }
      }
    case Action.SET_SEARCH_RESULTS:
      return {
        ...state,
        suggestions: action.payload,
      };
    case Action.RESET:
      {
        return initialState
      }
    default:
      return state;
  }
}

// actions
export const setSearch = (search = "") => ({
  type: Action.SET_SEARCH_TEXT,
  payload: search
});

export const selectItemId = (itemId: number) => ({
  type: Action.SET_SELECTED_ITEM_ID,
  payload: itemId
})

export const setSearchResults = (results: CitySuggestion[] = []) => ({
  type: Action.SET_SEARCH_RESULTS,
  payload: results
})

export const addOrUpdateForecast = (cityId: number, temperature: number) => ({
  type: Action.ADD_OR_UPDATE_FORECAST,
  payload: {
    cityId,
    temperature
  }
})

export const resetForecast = () => ({
  type: Action.RESET_FORECAST
})

export const reset = () => ({
  type: Action.RESET,
})

export type WeatherSearchAction = Action
export type WeatherSearchState = State
export const weatherSearchReducer = reducer
export default initialState;