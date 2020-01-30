import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

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

const CountryList = ({ countries }) => {
  return (
    <div>
      {countries.map(country => 
        <div key={country.name}>{country.name}</div>
      )}
    </div>
  )
}

const Country = ({ country }) => {
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
    </div>
  )
}

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ search, setSearch ] = useState('')

  const countriesToShow = countries.filter(country =>
    country.name.toLowerCase().includes(search.toLowerCase()))

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearch = (event) => {
    setSearch(event.target.value)
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
      <CountryList countries={countriesToShow} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
