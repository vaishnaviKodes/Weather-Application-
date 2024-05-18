import "./App.css";
import { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const getData = async (event) => {
    event.preventDefault();

    try {
      let response = await fetch(
        `https://api.weatherbit.io/v2.0/current?city=${city}&key=711cf535eb86413483650e6fad732971&include=minutely`
      );
      let data = await response.json();
      console.log(data);
      if (data && data.data && data.data.length > 0 && data.data[0].city_name) {
        setWeatherData(data);
        setError(null);
      } else {
        setWeatherData(null);
        setError("Enter a valid city name");
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("Error fetching weather data");
    }

    setCity(""); // Clear the input after fetching data
  };

  return (
    <div className="w-[100%] h-[100vh] bg-[#4aacb1]">
      <div className="max-w-[1320px] mx-auto">
        <h1 className="text-[40px] font-bold py-[50px] text-white">
          Simple Weather App
        </h1>
        <form onSubmit={getData}>
          <input
            type="text"
            className="w-[300px] h-[40px] pl-3"
            placeholder="City Name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            type="submit"
            className="bg-[#196569] text-white px-4 py-2 ml-2"
          >
            Submit
          </button>
        </form>
        {error && <p className="text-red-500">{error}</p>}
        {weatherData && weatherData.data && weatherData.data.length > 0 && (
          <div className="w-[400px] mx-auto bg-white shadow-lg mt-[40px] p-[25px]">
            <h3 className="font-bold text-[30px]">
              {weatherData.data[0].city_name}
              <span className="bg-yellow">
                {" "}
                {weatherData.data[0].country_code}
              </span>
            </h3>
            <h2 className="font-bold text-[40px]">
              {weatherData.data[0].temp}°C
            </h2>
            <img
              src={`https://www.weatherbit.io/static/img/icons/${weatherData.data[0].weather.icon}.png`}
              alt="Weather Icon"
            />
            <p>{weatherData.data[0].weather.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
