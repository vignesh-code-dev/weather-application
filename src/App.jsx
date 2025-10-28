import "./App.css";
import searchIcon from "./assets/searchIcon.png";
import { useEffect, useState } from "react";
import sunIcon from "./assets/sun.png";
import cloudsIcon from "./assets/clouds.png";
import humidityIcon from "./assets/humidity.png";
import rainyIcon from "./assets/rainy.png";
import thunderIcon from "./assets/thunder.png";
import windIcon from "./assets/wind.png";
import partlyCloundIcon from "./assets/partly-cloudy.png";
const App = () => {
  const [text, setText] = useState("");
  const [icon, setIcon] = useState(sunIcon);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState(null);
  const [country, setCountry] = useState("India");
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);

  const iconList = {
    "01d": sunIcon,
    "10d": rainyIcon,
    "03d": cloudsIcon,
    "11d": thunderIcon,
    "02d": partlyCloundIcon,
  };

  const weatherReport = async (cityName = "karur") => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=f9f56a443daaae0952312daabb62cb3f&units=metric`
      );
      let result = await response.json();
      if (result.cod !== 200) {
        alert("City not found");
        return;
      }
      setTemp(result.main.temp);
      setCity(result.name);
      setCountry(result.sys.country);
      setLat(result.coord.lat);
      setLong(result.coord.lon);
      setHumidity(result.main.humidity);
      setWind(result.wind.speed);

      const iconCode = result.weather[0].icon;
      setIcon(iconList[iconCode] || sunIcon);
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  const HandleSearch = () => {
    if (text.trim() === "") {
      alert("Please enter a city name..!");
    }
    weatherReport(text);
    setText("");
    return;
  };
  useEffect(() => {
    weatherReport();
  }, []);

  return (
    <div className="container">
      <div className="input-container">
        <input
          type="text"
          placeholder="search city"
          onChange={(e) => setText(e.target.value)}
        />
        <img src={searchIcon} alt="search" onClick={HandleSearch} />
      </div>
      <div className="weatherIcon">
        <img src={icon} alt="weatherIcon" />
      </div>
      <div className="weather-details">
        <div className="temp">
          {temp}
          <span>°C</span>
        </div>
        <div className="city">{city}</div>
        <div className="country">{country}</div>
        <div className="cord">
          <div>
            <span className="lat">Latitude</span>
            <span>{lat}</span>
          </div>
          <div>
            <span className="long">Longtitude</span>
            <span>{long}</span>
          </div>
        </div>
        <div className="report">
          <div>
            <img src={humidityIcon} alt="humidity" />
            <div className="humidity">{humidity}%</div>
            <div>Humidity</div>
          </div>
          <div>
            <img src={windIcon} alt="wind" />
            <div className="wind">{wind} Km/hr</div>
            <div>Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
