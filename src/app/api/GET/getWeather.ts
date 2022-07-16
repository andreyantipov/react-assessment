export const getWeather = async (lat: number, lon: number) => {
    const endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=0ef2fad38ce6027d92e6eda71774ad11`
    try {
        const data = await fetch(endpoint);
        return data.json();
    } catch {
        return []
    }
}
