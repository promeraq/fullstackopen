import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const APIKEY = process.env.REACT_APP_API_KEY;

function App() {
  const [countries, setCountries] = useState([]);
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState({
    temperature: "",
    windSpeed: "",
    windDirection: "",
  });

  const handleInput = (event) => {
    const newInput = event.target.value;
    setInput(newInput);
  };

  const showCountry = (country) => {
    setInput(country);
  };

  useEffect(() => {
    if (input) {
      axios
        .get(`https://restcountries.com/v3.1/name/${input}`)
        .then((response) => {
          setCountries(response.data);
          console.log(response.data);
        })
        .catch((error) => console.error("Error al obtener los datos:", error));
    }
  }, [input]);

  useEffect(() => {
    if (countries.length === 1) {
      axios
        .get(
          `http://api.weatherstack.com/current?access_key=${APIKEY}&query=${countries[0].capital[0]}`
        )
        .then((response) => {
          console.log("weather", response.data);
          setWeather({
            temperature: response.data.current.temperature,
            windSpeed: response.data.current.wind_speed,
            windDirection: response.data.current.wind_dir,
          });
        })
        .catch((error) => console.error("Error al obtener weather:", error));
    }
  }, [countries, input]);

  return (
    <main className="main">
      <div className="input">
        <p>find countries</p>
        <input value={input} onChange={handleInput} />
      </div>
      {countries.length > 10 && "Too many matches, specify another filter"}
      {countries.length > 1 && countries.length < 10 && (
        <ul className="list">
          {countries.map((country) => (
            <li key={country.name.common} className="country">
              <p className="countryName">{country.name.common}</p>
              <button onClick={() => showCountry(country.name.common)}>
                show
              </button>
            </li>
          ))}
        </ul>
      )}
      {countries.length === 1 && (
        <ul className="list">
          {countries.map((country) => (
            <li key={country.area}>
              <h1>{country.name.common}</h1>
              <p>Capital {country.capital}</p>
              <p>Population {country.population}</p>
              <h2>Languages</h2>
              <ul>
                {Object.values(country.languages).map((value) => (
                  <li key={value}>{value}</li>
                ))}
              </ul>
              <img
                alt={country.flags.alt}
                src={country.flags.png}
                className="img"
              />
              <h2>Weather in {country.capital[0]}</h2>
              <div className="weather">
                <h3>temperature:</h3>
                <p>{weather.temperature} Celsius</p>
              </div>
              <div className="weather">
                <h3>wind: </h3>
                <p>
                  {weather.windSpeed} mph direction {weather.windDirection}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default App;
