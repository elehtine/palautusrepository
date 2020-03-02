export const setNotification = (message, time) => {
  return dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      message
    })
    setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        message: null
      })
    }, time * 1000)
  }
}

const initialState = null

const notificationReducer =  (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      console.log(action.message)
      return action.message
    default: return state
  }
}

export default notificationReducer
