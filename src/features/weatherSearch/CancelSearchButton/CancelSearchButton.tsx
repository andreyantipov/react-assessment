import { useContext } from "react";
import { AppStore } from "app";
import { reset, resetForecast } from "../weatherSearch.feature";
import { Button } from "app/ui";

export const CancelSearchButton = () => {
  const [state, dispatch] = useContext(AppStore);
  const isDisabled = !(
    state.weather.dirtyState?.search ||
    typeof state.weather.forecaset !== "undefined"
  );

  const resetHandler = () => {
    if (state.weather.forecast) {
      dispatch(resetForecast());
    } else {
      dispatch(reset());
    }
  };

  return (
    <Button variant="borderless" onClick={resetHandler} disabled={isDisabled}>
      <span className="material-symbols-outlined">backspace</span>
    </Button>
  );
};
