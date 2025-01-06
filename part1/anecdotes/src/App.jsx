import { useState } from 'react'
import Button from './Button'
import Anecdotes from './Anecdotes'
import Votes from './Votes'
import AnecdoteMV from './AnecdoteMV'
import Header from './Header'

function App() {
  const [selected, setSelected] = useState(0)
        //4
  const [allVotes, setAllVotes] = useState(Array(6).fill(0))
        //4 = 4
        //3 = 0
        //0 = 2

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later',
    'The first 90 percent of the code accounts for the first 10 percent of the development time... The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand',
    'Premature optimization is the root of all evil.',
    'The only way to go fast, is to go well'
  ]

  const handleSetAnecdotes = () => {
    const indice = Math.floor(Math.random() * anecdotes.length)
    setSelected(indice)
    console.log(`indice ${indice}: ${anecdotes[indice]}`)
  }
  const handleSetVotes = () => {
    const newAllVotes = [...allVotes]
    newAllVotes[selected] += 1
    setAllVotes(newAllVotes)
    console.log(`votos ${anecdotes[selected]}: ${newAllVotes[selected]}`)
  }

  return (
    <>
    <Header title="Anecdote of the day"/>
      <Anecdotes anecdotes={anecdotes[selected]}/>
      <Votes votes={allVotes[selected]}/>
      <Button onClick={handleSetVotes} text="vote"/>
      <Button onClick={handleSetAnecdotes} text="next anecdote"/>
      <Header title="Anecdote with most votes"/>
      <AnecdoteMV votes={allVotes} anecdotes={anecdotes} selected={selected}/>

    </>
  )
}

export default App
