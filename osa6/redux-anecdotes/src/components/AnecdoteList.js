import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)

  const getById = (id) => anecdotes.find(a => a.id === id)

  const handleNotifications = (id) => {
    const anecdote = getById(id)
    dispatch(setNotification(`Voted '${anecdote.content}'`))

    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  const upperCaseTrim = (str) => str.toUpperCase().trim()

  const filteredAnecdotes = () => {
    return anecdotes.filter(a =>
      upperCaseTrim(a.content).includes(upperCaseTrim(filter))
    )
  }

  //changed to obj from id
  const vote = (obj) => {
    console.log('vote', obj)
    dispatch(voteAnecdote(obj))
    handleNotifications(obj.id)
  }

  const anecdoteList = () => {
    return (
      filteredAnecdotes().map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )
    )
  }

  return (
    <div>
      {anecdotes ? anecdoteList() : null}
    </div>
  )
}

export default AnecdoteList