
const userAuth = require('./auth');
const users = require('./users');

module.exports = {
    ...userAuth,
    ...users
}