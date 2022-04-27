const { Router } = require('express');
const { check }  = require('express-validator');

const { validateFields } = require('../middlewares');
const { login, googleSignIn } = require('../controllers');

const router = Router();

//POST ROUTER
router.post('/login', [
    check( 'email', 'Required email').isEmail(),
    check( 'password', 'Required password').notEmpty(),
    validateFields,
], login);

//POST ROUTER
router.post('/google', [
    check( 'id_token', 'id_token de google es necesario').notEmpty(),
    validateFields,
], googleSignIn);

module.exports = router;