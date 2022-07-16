import { Text } from 'app/ui';
import { WeatherSearch } from "features/weatherSearch";
import $ from './MainPage.module.css';


export const MainPage = () => {
  return (
    <section className={$.main_page}>
      <section className={$.search__section}>
        <WeatherSearch />
        <div className={$.search__tooltip}>
          <Text size="small">✨ Keyboard hints: </Text>
          <Text size="small">– use ⌘ + k to focus search</Text>
          <Text size="small">– use arrows to navigate ↑ ↓ between cities</Text>
          <Text size="small">– press ↵ to open card</Text>
          <Text size="small">– esc to dismiss weather results or search results</Text>
        </div>
      </section>
    </section>
  );
};
