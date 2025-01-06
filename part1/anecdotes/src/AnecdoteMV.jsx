import React from 'react'

const AnecdoteMV = ({votes, anecdotes, }) => {

    const maxVotes = Math.max(...votes)
    const index = votes.indexOf(maxVotes)

    if(maxVotes === 0) {
        return (
            <p>Not votes yet</p>
        )
    }
  return (
    <div>
      <p>la anecdota con mayores votos es: {anecdotes[index]}</p>
    </div>
  )
}

export default AnecdoteMV

//0 = 1
//1 = 0
//2 = 3
//3 = 5

