import { createFeature, ActionPayload } from 'app/utils'

type State = {
  dirtyState: {
    search: string,
    focused: boolean,
    selectedItemId: number
  },
  suggestions: {},
  forecast: {} | undefined
}

const initialState: State = {
  dirtyState: {
    search: "",
    focused: false,
    selectedItemId: 0,
  },
  suggestions: [],
  forecast: undefined
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
    addOrUpdateForecast(state, action: ActionPayload<{ temperature: string }>) {
      state.forecast = action.payload
    },
    resetForecast(state) {
      state.forecast = undefined
    },
    reset(state) {
      state.dirtyState.search = ""
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
