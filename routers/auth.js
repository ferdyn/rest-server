const { Router } = require('express');
const { check }  = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { login } = require('../controllers/auth');

const router = Router();

//POST ROUTER
router.post('/login', [
    check( 'email', 'Required email').isEmail(),
    check( 'password', 'Required password').notEmpty(),
    validateFields,
], login);

module.exports = router;