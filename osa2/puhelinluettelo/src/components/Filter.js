import React from 'react'

const Filter = ({ setShowAll, setNewFilter }) => {
    const handleFilterChange = (event) => {
      //en oo täysin varma tän logiikasta
      if (event.target.value === null) {
        setShowAll(true)
      } else {
        setNewFilter(event.target.value)
        setShowAll(false)
      }
    }
  
    return (
      <div>
        filter names:
        <input onChange={handleFilterChange} />
      </div>
    )
  }

  export default Filter