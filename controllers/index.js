const auth = require('../controllers/auth')
const categories = require('../controllers/categories')
const products = require('../controllers/products')
const users = require('../controllers/users')
const search = require('../controllers/search')
const uploadsFiles = require('../controllers/uploads')

module.exports = {
  ...auth,
  ...categories,
  ...products,
  ...users,
  ...search,
  ...uploadsFiles
}
