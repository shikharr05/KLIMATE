import { useState } from "react";
import "./App.css";
import Search from "./components/search/Search";
import CurrentWeather from "./components/current-weather/CurrentWeather";
import { CurrentWeatherUrl, currentWeatherApi_Key } from "./Api";
import currentWeather from "./components/current-weather/CurrentWeather";
import Forecast from "./components/forecast/Forecast";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const CurrentWeatherFetch = fetch(
      `${CurrentWeatherUrl}/weather?lat=${lat}&lon=${lon}&appid=${currentWeatherApi_Key}&units=metric`
    );
    const forecastFetch = fetch(
      `${CurrentWeatherUrl}/forecast?lat=${lat}&lon=${lon}&appid=${currentWeatherApi_Key}&units=metric`
    );

    Promise.all([CurrentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();//returns the object that contains the data of the currentWeather,
        const forecastResponse = await response[1].json();//same for forecast

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  };

  console.log(currentWeather);
  console.log(forecast);

  return (
    <div className="w-full m-20-auto text-left">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data = {forecast} />}
    </div>
  );
}

export default App;
