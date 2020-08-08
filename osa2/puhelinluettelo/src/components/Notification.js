import React from 'react'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  //if someone's name is Error then it's.. red. But that's ok for now
  const styleColor = message.includes("Error") ? "errorMessage" : "successMessage"

  return (
    <div className={styleColor}>
      {message}
    </div>
  )
}

export default Notification