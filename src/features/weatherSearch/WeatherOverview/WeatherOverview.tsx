import { useContext } from 'react';
import { AppStore } from 'app';
import { classNames } from 'app/utils'
import { Text } from 'app/ui';
import $ from './WeatherOverview.module.css'

export const WeatherOverview = () => {
    const [state] = useContext(AppStore);

    const classes = classNames($, {
        'weather-overview': true
    });

    const temperature = +(state.weather.forecast.temp/10).toPrecision(3) | 0
    const cityName = state.weather.forecast.name || ""

    return(<section className={classes}>
        <Text size='h1' color='secondary'>{cityName}</Text>
        <Text size='medium' color='secondary'>Temperature: {temperature} °C</Text>
    </section>)
}