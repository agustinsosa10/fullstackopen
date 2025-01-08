import { useState } from 'react'
import './App.css'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [value, setValue] = useState('')

  const handleChange = (event) => {
    console.log(event.target.value)
    setValue(event.target.value)
  }

  const onSearch = (event) => {
    event.preventDefault()
    console.log(value)
    setCountries(value)
  }

  console.log(countries)
  return (
    <div>
      <form onSubmit={onSearch}>
        countries: <input value={value} onChange={handleChange}/>
        <button type="submit">consultar pais</button>
      </form>
    </div>
  )
}

export default App

