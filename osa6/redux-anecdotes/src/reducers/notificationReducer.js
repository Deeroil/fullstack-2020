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

export const setNotification = (text) => {
  return {
    type: 'SET_NOTIFICATION',
    notification: text
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
    notification: ''
  }
}

export default notificationReducer