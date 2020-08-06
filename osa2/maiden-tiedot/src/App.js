import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShowButton = ({ name, setFilter }) => <button onClick={() => setFilter(name)}>show</button>

const Weather = ({ city }) => {
  const [ weather, setWeather ] = useState([])
  const api_key = process.env.REACT_APP_API_KEY

  const hook = () => {
    axios.get('http://api.weatherstack.com/current?access_key=' + api_key + '&query=' + city)
      .then(response => {
        setWeather(response.data.current)
      })
  }

  useEffect(hook, [])

  return (
    <>
      <h2>Weather in {city} </h2>
      <img src={weather.weather_icons} alt={weather.weather_descriptions}></img>
      <div>{weather.weather_descriptions}</div>
      <div>Temperature: {weather.temperature} °C</div>
      <div>Wind: {weather.wind_speed} mph, direction {weather.wind_dir}</div>
    </>
  )
}

const Country = ({ country }) => {
  return (
    <>
      <h1>{country.name}</h1>
      <div>Population: {country.population}</div>
      <div>Capital: {country.capital}</div>
      <div> Languages:</div>
      <ul>
        {country.languages.map(l => <li key={l.name}> {l.name} </li>)}
      </ul>
      <img src={country.flag} width="150" alt="flag" />
      <Weather city={country.capital} />
    </>
  )
}

const App = () => {
  const [ filter, setFilter ] = useState('')
  const [ countries, setCountries ] = useState([])

  const hook = () => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }

  useEffect(hook, [])

  const filteredNames =
    countries
      .map(c => c.name)
      .filter(c => c.toLowerCase().includes(filter.toLowerCase()))

  const formList = () => {
    if (filteredNames.length === 1) {
      return <Country country={countries.find(
        c => c.name === filteredNames[0]
      )} />
    }

    if (filteredNames.length <= 10) {
      return filteredNames.map(name =>
        <div key={name}>
          {name}
          <ShowButton name={name} setFilter={setFilter} />
        </div>
      )
    }

    return <div>Too many matches, use the filter please</div>
  }

  const changeHandler = (event) => setFilter(event.target.value)

  return (
    <div>
      <h2>Find countries by name</h2>
      <form>
        <input onChange={changeHandler} />
      </form>
      {formList()}
    </div>
  )
}

export default App;
