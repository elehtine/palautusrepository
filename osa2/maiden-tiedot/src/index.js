import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const Find = ({ handleSearch, search }) => {
  return (
    <div>
      find countries <input
        value={search}
        onChange={handleSearch}
      />
    </div>
  )
}

const CountryList = ({ countries, setSearch }) => {
  return (
    <div>
      {countries.map(country => 
        <div key={country.name}>
          <form onSubmit={(event) => {
            event.preventDefault()
            setSearch(country.name)
          }}>
            {country.name} <button type="submit">view</button>
          </form>
        </div>
      )}
    </div>
  )
}

const Country = ({ country, weather }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      capital {country.capital}<br />
      population {country.population}
      <h2>languages</h2>
      <ul>
        {country.languages.map(language => 
          <li key={language.name}>{language.name}</li>
        )}
      </ul>
      <img src={country.flag} width="160" alt="NO FLAG"/>
      <Weather weather={weather} />
    </div>
  )
}

const Weather = ({ weather }) => {
  if (weather === null) {
    return (
      <div>
        null
      </div>
    )
  }
  return (
    <div>
      <h1>Weather in {weather.location.name}</h1>
      <p>
        <b>temperature:</b> {weather.current.temperature}
      </p>
      <img src={weather.current.weather_icons[0]} width="160" />
      <p>
        <b>wind:</b> {weather.current.wind_speed} mph direction {weather.current.wind_dir}
      </p>
    </div>
  )
}

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ city, setCity ] = useState('')
  const [ search, setSearch ] = useState('')
  const [ weather, setWeather ] = useState(null)

  const countriesToShow = countries.filter(country =>
    country.name.toLowerCase().includes(search.toLowerCase()))

  if (countriesToShow.length === 1 && city === '') {
    setCity(countriesToShow[0].capital)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
    if (city !== '') {
      setWeather(null)
      axios
        .get('http://api.weatherstack.com/current' +
          '?access_key=' + api_key +
          '&query=' + city)
        .then(response => {
          setWeather(response.data)
        })
    }
  }, [ city ])

  const handleSearch = (event) => {
    setSearch(event.target.value)
    setCity('')
  }

  if (countriesToShow.length === 1) {
    return (
      <div>
        <Find 
          handleSearch={handleSearch}
          search={search}
        />
        <Country
          country={countriesToShow[0]}
          weather={weather}
        />
      </div>
    )
  }
    
  return (
    <div>
      <Find 
        handleSearch={handleSearch}
        search={search}
      />
      <CountryList 
        countries={countriesToShow}
        setSearch={setSearch}
      />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
