import axios from "axios";
const api_key = import.meta.env.VITE_SOME_KEY;

const Country = ({ country, showDetails }) => (
  <li key={country.name.common}>
    {country.name.common}
    <button id={country.name.common} onClick={showDetails}>
      show
    </button>
  </li>
);

const CountryDisplay = ({
  filteredCountries,
  showDetails,
  weather,
  setWeather,
}) => {
  if (filteredCountries.length === 0) {
    return <p>Loading data. Please press enter after a few seconds</p>;
  }
  if (filteredCountries.length === 1) {
    const lat = filteredCountries[0].latlng[0];

    const lon = filteredCountries[0].latlng[1];
    const languagesArray = [];
    for (const language in filteredCountries[0].languages) {
      languagesArray.push(filteredCountries[0].languages[language]);
    }
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`
      )
      .then((res) => res.data)
      .then((data) =>
        setWeather({
          temp: Math.round((data.main.temp - 273.15) * 100) / 100,
          icon: data.weather[0].icon,
          wind: data.wind.speed,
        })
      );
    return (
      <>
        <h1>{filteredCountries[0].name.common}</h1>
        <p>Capital {filteredCountries[0].capital}</p>
        <p>Area {filteredCountries[0].area}</p>
        <h3>Languages:</h3>
        <ul>
          {languagesArray.map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <div className="flag">{filteredCountries[0].flag}</div>
        <h2>Weather in {filteredCountries[0].capital}</h2>
        <p>temperature: {weather.temp} Celsius</p>
        <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} />
        <p>wind: {weather.wind} m/s</p>
      </>
    );
  } else if (filteredCountries.length <= 10) {
    return (
      <ul>
        {filteredCountries.map((country) => (
          <Country
            key={country.name.common}
            country={country}
            showDetails={showDetails}
          />
        ))}
      </ul>
    );
  } else if (filteredCountries.length > 10) {
    return <p>"Too many matches, specify another filter"</p>;
  }
};

export default CountryDisplay;
