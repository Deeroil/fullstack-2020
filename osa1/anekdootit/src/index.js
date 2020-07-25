import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = (props) => {
  const [selected, setSelected] = useState(0)
  //allVotes[0] keeps track of votes for anecdotes[0] etc
  const [allVotes, setVotes] = useState(new Array(props.anecdotes.length).fill(0))
  const [mostPopular, setMostPopular] = useState(0)
  const [maxVotes, setMaxVotes] = useState(0)
  
  const handleVote = () => {
    const copy = [...allVotes]
    const index = selected
    copy[index] += 1
    setVotes(copy)
    if (copy[index] > maxVotes) {
      setMostPopular(index)
      setMaxVotes(copy[index])
    }
  }

  return (
    <>
      <h2>Randomized anecdote</h2>
      <div>{props.anecdotes[selected]}</div>
      <button onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))}>get random anecdote</button>
      <button onClick={handleVote}>vote</button>
      <h2>Anecdote with most votes</h2>
      <div>{props.anecdotes[mostPopular]}</div>
      <div>... with {maxVotes} votes</div>
    </>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)