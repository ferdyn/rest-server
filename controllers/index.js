
const auth = require('../controllers/auth');
const categories = require('../controllers/categories');
const products = require('../controllers/products');
const users = require('../controllers/users');

module.exports = {
    ...auth,
    ...categories,
    ...products,
    ...users,
}