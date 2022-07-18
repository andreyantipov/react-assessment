import { useRef, useContext } from "react";
import { AppStore } from "app";
import { useGlobalDismiss } from "app/ui";
import { SearchBar } from "./SearchBar/SearchBar";
import { reset, resetForecast } from './weatherSearch.feature'
import { SearchCityNamesInput } from "./SearchCityNamesInput/SearchCityNamesInput";
import { SearchResults } from './SearchResults/SearchResults'
import { CancelSearchButton } from "./CancelSearchButton/CancelSearchButton";
import { WeatherOverview } from "./WeatherOverview/WeatherOverview";

export const WeatherSearch = () => {
  const container = useRef<HTMLDivElement>(null);
  const [state, dispatch] = useContext(AppStore);

  useGlobalDismiss(container, () => {
    dispatch(resetForecast());
    dispatch(reset());
  });

  return (
      <SearchBar ref={container}>
        <SearchCityNamesInput />
        {state.weather.forecast ? <WeatherOverview /> :  <SearchResults />}        
        <CancelSearchButton />
      </SearchBar>
  );
};
