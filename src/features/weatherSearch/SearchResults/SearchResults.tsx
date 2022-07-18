import { useContext, useRef, useMemo, useCallback } from "react";
import { AppStore } from "app";
import { getWeather } from "app/api";
import {
  List,
  ListItem,
  Highlighter,
  useGlobalKeyPress,
  useHighlighter,
} from "app/ui";
import { selectItemId, addOrUpdateForecast } from "../weatherSearch.feature";
import $ from "./SearchResults.module.css";

export const SearchResults: FCC = () => {
  const list = useRef<HTMLUListElement>(null);
  const [state, dispatch] = useContext(AppStore);
  const h = useHighlighter(state.weather.dirtyState.search, Highlighter);
  const { suggestions, dirtyState } = state.weather;

  const fetchForecast = useCallback(
    (listCityIndex: number) => {
      if (typeof state.weather.suggestions[listCityIndex] !== "undefined") {
        const {
          coordinates: [lat, lon],
        } = state.weather.suggestions[listCityIndex];

        getWeather(lat, lon).then((data) => {
          if (data.main.temp) {
            dispatch(
              addOrUpdateForecast({
                cityId: listCityIndex,
                temperature: +(data.main.temp / 10).toFixed(1),
              })
            );
          }
        });
      }
    },
    [state.weather.suggestions, dispatch]
  );

  useGlobalKeyPress("Enter", () => {
    const listCityIndex = state.weather.dirtyState.selectedItemId;
    fetchForecast(listCityIndex);
  });

  useGlobalKeyPress("ArrowUp", () => {
    const nextId =
      dirtyState.selectedItemId >= 1 ? dirtyState.selectedItemId - 1 : 0;
    const target = list.current;

    if (target) {
      const selection = target.querySelector(`[data-index="${nextId}"]`);
      selection?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }

    dispatch(selectItemId(nextId));
  });

  useGlobalKeyPress("ArrowDown", () => {
    if (suggestions.length - 1 > dirtyState.selectedItemId) {
      const nextId = dirtyState.selectedItemId + 1;
      const target = list.current;

      if (target) {
        const selection = target.querySelector(`[data-index="${nextId}"]`);
        selection?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "start",
        });
      }

      dispatch(selectItemId(nextId));
    }
  });

  return useMemo(() => {
    const selectItemHandler = (e: React.MouseEvent<HTMLElement>) => {
      const target = e.target as HTMLElement;
      const listCityIndex = Number(target.getAttribute("data-index"));
      dispatch(selectItemId(listCityIndex));
      fetchForecast(listCityIndex);
    };

    if (suggestions?.length >= 1) {
      return (
        <div className={$["search-results"]}>
          <List onClick={selectItemHandler} ref={list}>
            {suggestions.map(({ name, country }: any, index: number) => {
              return (
                <ListItem
                  key={index}
                  data-index={index}
                  selected={index === dirtyState.selectedItemId}
                >
                  <span key="text">
                    {h(country)} → {h(name)}
                  </span>
                  {state.weather.forecast[index] && (
                    <span key="weather">
                      {state.weather.forecast[index].temperature} °C
                    </span>
                  )}
                </ListItem>
              );
            })}
          </List>
        </div>
      );
    } else return null;
  }, [
    suggestions,
    dispatch,
    fetchForecast,
    dirtyState.selectedItemId,
    h,
    state.weather.forecast,
  ]);
};
