import { useState } from 'react'
import Button from './Button'
import Header from './Header'
import History from './History'
import Statistics from './Statistics'

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const handleSetGood = () => {
    console.log('clicked good')
    setGood( good + 1)
    setTotal( total + 1)
  }

  const handleSetNeutral = () => {
    console.log('clicked neutral')
    setNeutral( neutral + 1)
    setTotal( total + 1)
  }

  const handleSetBad = () => {
    console.log('clicked bad')
    setBad( bad + 1)
    setTotal( total + 1)
  }

  return (
    <>
    <Header title="give feedback"/>
    <Button handleClick={handleSetGood} text="good"/>
    <Button handleClick={handleSetNeutral} text="neutral"/>
    <Button handleClick={handleSetBad} text="bad"/>
    <Header title="statics" />
    <History total={total} good={good} neutral={neutral} bad={bad} />
    </>
    
  )
}

export default App
