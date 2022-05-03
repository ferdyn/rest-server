const { request, response } = require('express')

const isValidRole = (req = request, res = response, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: 'The Token must be validated before'
    })
  }

  const { role, name } = req.user

  if (role !== 'ADMIN_ROLE') {
    return res.status(500).json({
      msg: `${name} is not an administrator, to perform this operation`
    })
  }

  next()
}

const isRoles = (...roles) => {
  return (req = request, res = response, next) => {
    if (!req.user) {
      return res.status(500).json({
        msg: 'The Token must be validated before'
      })
    }

    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        msg: `This ${req.user.role} role is not among the allowed [${roles}]`
      })
    }

    next()
  }
}

module.exports = {
  isValidRole,
  isRoles
}
