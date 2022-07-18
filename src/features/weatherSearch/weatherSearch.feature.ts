import { createFeature, ActionPayload } from 'app/utils'

type State = {
  dirtyState: {
    search: string,
    focused: boolean,
    selectedItemId: number
  },
  suggestions: {},
  forecast: {
    [key: number]: {
      temperature: string
    }
  }
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


export const weatherSearch = createFeature<State>({
  name: 'weatherSearch',
  initialState,
  reducers: {
    setSearch(state, action: ActionPayload<string>) {
      state.dirtyState.search = action.payload
    },
    selectItemId(state, action: ActionPayload<number>) {
      state.dirtyState.selectedItemId = action.payload
    },
    setSearchResults(state, action: ActionPayload<[]>) {
      state.suggestions = action.payload
    },
    addOrUpdateForecast(state, action: ActionPayload<{ cityId: string, temperature: string}>) {
      const { temperature, cityId } = action.payload;
      state.forecast = {
        ...state.forecast,
        [cityId]: {
          temperature
        }
      }
    },
    resetForecast(state) {
      state.forecast = []
    },
    reset(state) {
      state.dirtyState.search = ""
      state.forecast = {}
      state.suggestions = []
    },
  }
})

export const {
  setSearch,
  selectItemId,
  setSearchResults,
  addOrUpdateForecast,
  resetForecast,
  reset
} = weatherSearch.actions
