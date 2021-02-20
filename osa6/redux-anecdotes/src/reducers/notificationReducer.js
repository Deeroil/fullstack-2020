const initialState = ''

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return state = action.notification
    case 'CLEAR_NOTIFICATION':
      return state = ''
    default:
      return state
  }
}

export const setNotification = (text, seconds) => {
  return async (dispatch) => {
    const milliseconds = seconds * 1000
    dispatch({
      type: 'SET_NOTIFICATION',
      notification: text
    })
    setTimeout(() => {
      dispatch(clearNotification())
    }, milliseconds)
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
    notification: ''
  }
}

export default notificationReducer