export const setNotification = (message, time) => {
  return dispatch => {
    const timeoutId = setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        message: null
      })
    }, time * 1000)

    dispatch({
      type: 'SET_NOTIFICATION',
      message,
      timeoutId
    })
  }
}

const initialState = { 
  message: null,
  timeoutId: null
}

const notificationReducer =  (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      if (action.message === null) {
        return {
          message: null,
          timeoutId: null
        }
      }

      if (state.timeoutId !== null) {
        clearTimeout(state.timeoutId)
      }

      return { 
        message: action.message,
        timeoutId: action.timeoutId
      }
    default: return state
  }
}

export default notificationReducer
