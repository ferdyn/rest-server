const { Schema, model } = require('mongoose')

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, 'The name is require!']
  },
  email: {
    type: String,
    required: [true, 'The email is require!'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'The pass is require!']
  },
  img: {
    type: String
  },
  role: {
    type: String,
    required: true,
    emun: ['ADMIN_ROLE', 'USER_ROLE'],
    default: 'USER_ROLE'
  },
  state: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  }
})

UserSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject()
  user.uid = _id
  return user
}

module.exports = model('User', UserSchema)
