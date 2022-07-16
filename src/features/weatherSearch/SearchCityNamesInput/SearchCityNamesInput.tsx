import { useContext, useEffect, useRef } from "react";
import { Input, useDebounce, useGlobalKeyPress } from "app/ui";
import { getCityNames } from "app/api";
import { AppStore } from "app";
import { setSearch, setSearchResults, reset, selectItemId, resetForecast } from "../weatherSearch.slice";

export const SearchCityNamesInput: FCC = () => {
  const [state, dispatch] = useContext(AppStore);
  const input = useRef<HTMLInputElement>(null);
  const searchValue = useDebounce(state.weather.dirtyState.search, 500);
  

  const searchCities = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (value) {
      dispatch(resetForecast());
      dispatch(selectItemId(0));
      dispatch(setSearch(value));
    } else {
      dispatch(reset());
    }
  };

  useGlobalKeyPress("Escape", () => {
    input.current?.blur();
    dispatch(setSearch(""));
    dispatch(setSearchResults());
  });

  useGlobalKeyPress(["Meta", "k"], () => {
    input.current?.focus();
  })

  useEffect(() => {
    if (searchValue) {
      getCityNames(searchValue).then((cities) => {
        dispatch(setSearchResults(cities));
      });
    }
  }, [searchValue, dispatch]);

  return (
    <Input
      ref={input}
      value={state.weather.dirtyState.search}
      onChange={searchCities}
      placeholder="Search weather by city name"
      variant="unstyled"
    />
  );
};
