const { request, response } = require('express')
const bcryptjs = require('bcryptjs')

const User = require('../models/user')

// GET USER
const getUsers = async (req = request, res = response) => {
  const { from = 0, limit = 5 } = req.query
  const query = { state: true }

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(from)).limit(Number(limit))
  ])

  res.json({
    total,
    users
  })
}

// POST USER
const postUsers = async (req = request, res = response) => {
  const { name, email, password, role } = req.body
  const user = new User({ name, email, password, role })

  // Encrypt to password
  const salt = bcryptjs.genSaltSync()
  user.password = bcryptjs.hashSync(password, salt)

  // Save on DDBB
  await user.save()

  res.json({
    user
  })
}

// PUT USER
const puttUsers = async (req = request, res = response) => {
  const { id } = req.params
  const { _id, password, google, email, ...rest } = req.body

  if (password) {
    // Encrypt to password
    const salt = bcryptjs.genSaltSync()
    rest.password = bcryptjs.hashSync(password, salt)
  }

  const user = await User.findByIdAndUpdate(id, rest)
  res.json({
    user
  })
}

// DELETE USER
const deletetUsers = async (req = request, res = response) => {
  const { id } = req.params

  const userAuth = req.user

  const user = await User.findByIdAndUpdate(id, { state: false })
  res.json({ user, userAuth })
}

// PATCH USER
const patchUsers = (req = request, res = response) => {
  res.json({
    msg: 'patch API - controllers'
  })
}

module.exports = {
  getUsers,
  postUsers,
  puttUsers,
  deletetUsers,
  patchUsers
}
