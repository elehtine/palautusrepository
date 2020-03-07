export const initializeUsers = (users) => {
  return {
    type: 'INIT_USERS',
    data: { users }
  }
}

export const setUser = (user) => {
  return {
    type: 'SET_USER',
    data: { user }
  }
}

const initialUsers = {
  users: [],
  user: null
}

const userReducer = (state = initialUsers, action) => {
  switch (action.type) {
  case 'INIT_USERS':
    return { users: action.data.users, user: state.user }
  case 'SET_USER':
    return { ...state, user: action.data.user }
  default:
    return state
  }
}

export default userReducer
