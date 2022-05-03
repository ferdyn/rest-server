const { Categorie, Role, User, Product } = require('../models')

// Valid Role
const isRoleExist = async (role = '') => {
  const existRole = await Role.findOne({ role })
  if (!existRole) {
    throw new Error(` The role ${role} is not exist`)
  }
}

// Valid Email
const isEmailExist = async (email = '') => {
  const exisEmail = await User.findOne({ email })
  if (exisEmail) {
    throw new Error(`This ${email} email already exist`)
  }
}

// Valid ID
const isIdExist = async id => {
  const exisId = await User.findById(id)
  if (!exisId) {
    throw new Error(`This ID: ${id} is not exist`)
  }
}

// Valid ID categorie
const isIdCategorieExist = async id => {
  const existId = await Categorie.findById(id)
  if (!existId) {
    throw new Error(`This categorie ID: ${id} is not exist`)
  }
}

// Valid ID product
const isIdProductExist = async id => {
  const existId = await Product.findById(id)
  if (!existId) {
    throw new Error(`This product ID: ${id} is not exist`)
  }
}

module.exports = {
  isRoleExist,
  isEmailExist,
  isIdExist,
  isIdCategorieExist,
  isIdProductExist
}
