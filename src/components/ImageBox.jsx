import { useEffect, useState } from "react";
import Card from "./Card";

function ImageBox({ selectedCityAcc }) {
  const [city, setCity] = useState(null);
  const [imgUrl, setImgUrl] = useState("");

  const [forecast, setForecast] = useState([]);

  const days = [
    forecast.slice(0, 1)[0],
    forecast.slice(3, 4)[0],
    forecast.slice(10, 11)[0],
    forecast.slice(18, 19)[0],
    forecast.slice(26, 27)[0],
    forecast.slice(34, 35)[0],
  ];

  console.log(days);
  const [isLoading, setIsLoading] = useState(true);

  const Key = "ef2b0344b3639d1f1e41f596f5cd8b13";
  const { lat, long, name } = selectedCityAcc;

  const getFormattedDate = () => {
    const options = {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return new Date().toLocaleString("en-US", options);
  };

  useEffect(() => {
    async function getCityWeather() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${Key}`
        );
        const data = await res.json();
        setCity(data);
      } catch (err) {
        console.error("Error fetching weather data:", err);
      } finally {
        setIsLoading(false);
      }
    }

    async function getCityImage() {
      try {
        const res = await fetch(
          `https://api.unsplash.com/photos/random?query=${name}&client_id=RZhegRJu3Ec03zGnLeR4DxfGXKAfvMzOXUBa-t2hJgc`
        );
        const data = await res.json();
        setImgUrl(data.urls?.regular || "");
      } catch (err) {
        console.error("Error fetching city image:", err);
      }
    }

    async function getForecast() {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=metric&appid=${Key}`
      );
      const data = await res.json();
      setForecast(data.list);
      console.log(data.list);
    }

    if (lat && long && name) {
      getCityWeather();
      getCityImage();
      getForecast();
    }
  }, [lat, long, name]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!city) {
    return <p>Unable to fetch weather data.</p>;
  }

  const { main, sys, weather, visibility } = city;

  if (!main || !weather || !sys) {
    return <p>Data is incomplete.</p>;
  }

  const { feels_like, humidity, temp } = main;
  const { description, icon } = weather[0] || {};
  const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <div className="">
      <div className="img-box">
        <div className="box-text">
          <p className="box-text__date">{getFormattedDate()}</p>
          <p className="box-text__city">
            {name}, {sys?.country}
          </p>
          <div className="box-text__tempBox">
            <img src={iconUrl} alt={description} />
            <p>{temp}°C</p>
          </div>
          <p className="box-text__feel">
            Feels like {feels_like}°C. {description}.
          </p>

          <div>
            <p>Humidity: {humidity}%</p>
            <p>Visibility: {visibility / 1000} km</p>
          </div>
        </div>
        <div className="box-img">
          <img src={imgUrl} alt={`${name} view`} />
        </div>
        <div className="daysBox">
          {days?.map((day, i) => (
            <Card key={i} day={day} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ImageBox;
