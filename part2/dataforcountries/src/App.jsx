import { useState, useEffect } from "react";
import CountryFinder from "./components/CountryFinder";
import axios from "axios";
import CountryDisplay from "./components/CountryDisplay";

const App = () => {
  const [searchString, setSearchString] = useState("");
  const [countryData, setCountryData] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [weather, setWeather] = useState({});
  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => setCountryData(response.data));
  }, []);

  const showDetails = (event) => {
    setWeather({});
    setFilteredCountries(
      filteredCountries.filter(
        (country) => event.target.id === country.name.common
      )
    );
  };

  const findCountries = (event) => {
    event.preventDefault();
    setWeather({});
    const matchingCountries = countryData.filter((country) =>
      country.name.common.toLowerCase().includes(searchString.toLowerCase())
    );
    setFilteredCountries(matchingCountries);
  };

  const handleChange = (event) => {
    setSearchString(event.target.value);
  };
  return (
    <>
      <CountryFinder
        searchString={searchString}
        findCountries={findCountries}
        handleChange={handleChange}
      />
      <CountryDisplay
        filteredCountries={filteredCountries}
        showDetails={showDetails}
        weather={weather}
        setWeather={setWeather}
      />
    </>
  );
};

export default App;
