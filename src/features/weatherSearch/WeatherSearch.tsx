import { useRef, useContext } from "react";
import { AppStore } from "app";
import { useGlobalDismiss } from "app/ui";
import { SearchBar } from "./SearchBar/SearchBar";
import { reset } from './weatherSearch.feature'
import { SearchCityNamesInput } from "./SearchCityNamesInput/SearchCityNamesInput";
import { SearchResults } from './SearchResults/SearchResults'
import { CancelSearchButton } from "./CancelSearchButton/CancelSearchButton";

export const WeatherSearch = () => {
  const container = useRef<HTMLDivElement>(null);
  const [, dispatch] = useContext(AppStore);

  useGlobalDismiss(container, () => {
    dispatch(reset());
  });

  return (
      <SearchBar ref={container}>
        <SearchCityNamesInput />        
        <SearchResults />
        <CancelSearchButton />
      </SearchBar>
  );
};
