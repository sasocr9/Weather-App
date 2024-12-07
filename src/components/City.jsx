function City({ city, onSelectCity }) {
  const acc = { lat: city.lat, long: city.lon, name: city.name };
  return (
    <div className="city" onClick={() => onSelectCity(acc)}>
      <div className="cityName">
        <h1>{city?.name}</h1>
        <h1>{city?.local_names?.ar}</h1>
      </div>

      <div className="country">
        <p>{city?.country}</p>
        <p>{city?.state}</p>
      </div>
    </div>
  );
}

export default City;
