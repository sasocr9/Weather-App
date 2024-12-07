function Card({ day }) {
  console.log(day);
  if (!day) return;
  const { main, weather, visibility, dt } = day;

  const unixTimestamp = dt; // Example Unix time
  const date = new Date(unixTimestamp * 1000); // Convert to milliseconds
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "short", // Short day name (e.g., Sat)
    month: "short", // Short month name (e.g., Dec)
    day: "2-digit", // Day of the month (e.g., 07)
    timeZone: "UTC", // Ensure UTC time
  });

  const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  return (
    <div className="card">
      <div className="card__main">
        <h1> {formattedDate}</h1>
        <div className="box-text__tempBox">
          <img
            className="weather__icon"
            src={iconUrl}
            alt={weather[0].description}
          />
          <p>{main.temp}°C</p>
        </div>
      </div>

      <p className="box-text__feel">Feels like {main.feels_like}°C. </p>
      <p className="weather__description">{weather[0].description}.</p>

      <div className="info">
        <p>Humidity: {main.humidity}%</p>
        <p>Visibility: {visibility / 1000} km</p>
      </div>
    </div>
  );
}

export default Card;
