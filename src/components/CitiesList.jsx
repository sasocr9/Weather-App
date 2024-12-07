import City from "./City";

function CitiesList({ cities, onSelectCity }) {
  return (
    <div className="citiesList">
      {cities.map((city, i) => (
        <City key={i} city={city} onSelectCity={onSelectCity} />
      ))}
    </div>
  );
}

export default CitiesList;
