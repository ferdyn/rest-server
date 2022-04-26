
const auth = require('../controllers/auth');
const users = require('../controllers/users');

module.exports = {
    ...auth,
    ...users
}