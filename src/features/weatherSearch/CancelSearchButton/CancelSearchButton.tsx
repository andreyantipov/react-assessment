import { useContext } from "react";
import { AppStore } from "app";
import { reset } from "../weatherSearch.feature";
import { Button } from "app/ui";

export const CancelSearchButton = () => {
  const [state, dispatch] = useContext(AppStore);
  const isDisabled =
    !(state.weather.dirtyState?.search || state.weather.suggestions?.length >= 1)

  const resetHandler = () => {
    dispatch(reset());
  };

  return (
    <Button variant="borderless" onClick={resetHandler} disabled={isDisabled}>
      <span className="material-symbols-outlined">backspace</span>
    </Button>
  );
};
