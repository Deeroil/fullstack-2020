import React from 'react'

const Notification = ({ message }) => {
  if (!message) {
    return null
  }

  const style = {
    color: 'white',
    backgroundColor: 'green',
    fontFamily: 'Arial',
    padding: '10px',
    borderStyle: 'solid',
    borderRadius: '5px',
    marginBottom: '10px',
  }

  const checkStyle = () => {
    if (message.includes('fail')) {
      style.backgroundColor = 'Red'
    }
    return style
  }

  return (
    <div style={checkStyle()}>
      {message}
    </div>
  )
}

export default Notification