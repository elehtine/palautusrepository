const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

describe('when already containing one user', () => {

  beforeEach(async () => {
    await User.deleteMany({})
    const user = new User({ username: 'root', name: 'Superuser', password: 'sekret' })
    await user.save()
  })
  
  test('new user can be added', async () => {
    const usersAtStart = await User.find({})

    const newUser = {
      username: 'ELlAS',
      name: 'Elias Lehtinen',
      password: 'kissa123'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await User.find({})
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })

  test('same user can not be added', async () => {
    const usersAtStart = await User.find({})

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'sekret'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await User.find({})
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('user with too short name can not be added', async () => {
    const usersAtStart = await User.find({})

    const newUser = {
      username: 'E',
      name: 'Elias Lehtinen',
      password: 'kissa123'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await User.find({})
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('user with too short password can not be added', async () => {
    const usersAtStart = await User.find({})

    const newUser = {
      username: 'ELlAS',
      name: 'Elias Lehtinen',
      password: '1'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await User.find({})
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

})
