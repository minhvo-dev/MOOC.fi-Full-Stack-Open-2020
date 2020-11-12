import React, { useState, useEffect } from "react";
import axios from "axios";

const Country = ({ country }) => {
  const [weather, setWeather] = useState(undefined);

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHERSTACK_API_KEY}&query=${country.capital}`)
      .then(response => {
        setWeather(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [country]);

  if (weather === undefined) {
    return (
      <div>
        <h2>{country.name}</h2>
        <div>Capital: {country.capital}</div>
        <div>Population: {country.population}</div>
        <h3>Spoken languages</h3>
        <ul>{country.languages.map(
          lang => <li key={lang.name}>{lang.name}</li>)}
        </ul>
        <img src={country.flag} alt={country.name} />
      </div>
    );
  }
  return (
    <div>
      <h2>{country.name}</h2>
      <div>Capital: {country.capital}</div>
      <div>Population: {country.population}</div>
      <h3>Spoken languages</h3>
      <ul>{country.languages.map(
        lang => <li key={lang.name}>{lang.name}</li>)}
      </ul>
      <img src={country.flag} alt={country.name} width="64" height="64" />
      <h3>Weather in {country.capital}</h3>
      <div><strong>Temperature:</strong> {weather.current.temperature} &deg;C</div>
      <img src={weather.current.weather_icons[0]} alt="weather icon" />
      <div><strong>Wind:</strong> {weather.current.wind_speed} mph direction {weather.current.wind_dir}</div>
    </div>
  );
}

export default Country;