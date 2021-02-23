import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const anecdotes = props.anecdotes
  const filter = props.filter

  const upperCaseTrim = (str) => str.toUpperCase().trim()

  const filteredList = () => {
    return anecdotes.filter(a =>
      upperCaseTrim(a.content).includes(upperCaseTrim(filter))
    )
  }

  //changed to obj from id
  const vote = (obj) => {
    console.log('vote', obj)
    props.voteAnecdote(obj)
    props.setNotification(`Voted '${obj.content}'`, 5)
  }

  const anecdoteList = () => {
    return (
      filteredList().map(anecdote =>
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

const mapStateToProps = (state) => {
  console.log('mapStateToProps state', state)
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  setNotification
}

const connectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default connectedAnecdoteList