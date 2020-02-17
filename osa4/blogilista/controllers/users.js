const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
  const users = await User
    .find({})
    .populate('blogs', { url: 1, title: 1, author: 1 })

  res.json(users.map(user => user.toJSON()))
})

usersRouter.post('/', async (req, res) => {
  const body = req.body

  if (body.password.length < 3) {
    return res.status(400).json({ error: "invalid password" })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const newUser = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })

  try {
    const savedUser = await newUser.save()
    res.status(201).json(savedUser)
  } catch (expection) {
    return res.status(400).json({ error: "invalid username" })
  }
  
})

module.exports = usersRouter
