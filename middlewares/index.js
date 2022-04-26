
const validateJWT    = require('../middlewares/validate-jwt');
const validateFields = require('../middlewares/validate-fields');
const validateRoles  = require('../middlewares/validate-roles');

module.exports = {
    ...validateJWT,
    ...validateFields,
    ...validateRoles
}