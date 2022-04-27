
const auth = require('../controllers/auth');
const users = require('../controllers/users');
const categories = require('../controllers/categories');

module.exports = {
    ...auth,
    ...users,
    ...categories
}