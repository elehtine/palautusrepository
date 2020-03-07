export const createNotification = (notification, type, timeoutId) => {
  return {
    type: 'CREATE_NOTIFICATION',
    data: {
      message: notification,
      type,
      timeoutId
    }
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION'
  }
}

const initialState = {
  notification: {
    message: null,
    type: null
  },
  timeoutId: null
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'CREATE_NOTIFICATION':
    if (state.timeoutId) {
      clearTimeout(state.timeoutId)
    }
    return action.data
  case 'REMOVE_NOTIFICATION':
    return initialState
  default:
    return state
  }
}

export default notificationReducer
