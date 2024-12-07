import { useState } from "react";
import "./App.css";
import ImageBox from "./components/ImageBox";
import Main from "./components/Main/Main";
import Navbar from "./components/Main/Navbar";
import Search from "./components/Navbar/Search";
import CurrentCity from "./components/CurrentCity";
import CitiesBox from "./components/CitiesBox";
import CitiesList from "./components/CitiesList";
import useGeo from "./components/hooks/useGeo";
import Loader from "./components/Loader";

function App() {
  const [query, setQuery] = useState("");

  const { cities, isLoading, error } = useGeo(query);

  const [selectedCityAcc, setSelectedCityAcc] = useState(null);

  function handleSelectCity(cityAcc) {
    setSelectedCityAcc((selectedCityAcc) =>
      cityAcc === selectedCityAcc ? null : cityAcc
    );
  }


  // useEffect(() => {
  //   async function fetchWeather() {
  //     const res = await fetch(
  //       `https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=${Key}`
  //     );
  //     const data = await res.json();
  //     console.log(data);
  //   }

  //   fetchWeather();
  // }, []);

  //api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=ef2b0344b3639d1f1e41f596f5cd8b13
  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
      </Navbar>

      <Main>
        <CitiesBox>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <CitiesList cities={cities} onSelectCity={handleSelectCity} />
          )}
        </CitiesBox>

        <CurrentCity>
          {selectedCityAcc ? (
            <ImageBox selectedCityAcc={selectedCityAcc} />
          ) : null}
        </CurrentCity>
      </Main>
    </>
  );
}

export default App;
