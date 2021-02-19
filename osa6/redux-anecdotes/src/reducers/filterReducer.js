const initialState = ''

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return state = action.filter
    default:
      return state
  }
}

export const setFilter = (text) => {
  return {
    type: 'SET_FILTER',
    filter: text
  }
}

export default filterReducer