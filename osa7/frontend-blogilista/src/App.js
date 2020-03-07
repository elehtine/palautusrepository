import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch, Route, Link,
  useParams
} from 'react-router-dom'

import Notification from './components/Notification'
import Blog from './components/Blog'
import BlogList from './components/BlogList'
import User from './components/User'
import UserList from './components/UserList'

import {
  createNotification,
  removeNotification
} from './reducers/notificationReducer'
import {
  setUser,
  initializeUsers
} from './reducers/userReducer'

import userService from './services/users'
import loginService from './services/login'
import storage from './utils/storage'

const App = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  const users = useSelector(state => state.users)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    userService.getAll().then(users =>
      dispatch(initializeUsers(users))
    )
  }, [dispatch])

  useEffect(() => {
    const user = storage.loadUser()
    dispatch(setUser(user))
  }, [dispatch])

  const notifyWith = (message) => {
    const timeoutId = setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
    dispatch(createNotification(message, 'success', timeoutId))
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      setUsername('')
      setPassword('')
      dispatch(setUser(user))
      notifyWith(`${user.name} welcome back!`)
      storage.saveUser(user)
    } catch(exception) {
      notifyWith('wrong username/password', 'error')
    }
  }

  const handleLogout = () => {
    dispatch(setUser(null))
    storage.logoutUser()
  }


  if ( !users.user ) {
    return (
      <div>
        <h2>login to application</h2>
        <Notification notification={notification} />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type='password'
              id='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login'>login</button>
        </form>
      </div>
    )
  }

  return (
    <Router>
      <div>
        <Link to="/" >blogs</Link>
        <Link to="/users" >users</Link>
        {users.user.name} logged in <button onClick={handleLogout}>logout</button>
      </div>

      <h2>blogs</h2>
      <Notification notification={notification} />

      <Switch>
        <Route path="/users/:id">
          <User />
        </Route>
        <Route path="/users">
          <UserList />
        </Route>
        <Route path="/blogs/:id">
          <Blog />
        </Route>
        <Route path="/">
          <BlogList />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
