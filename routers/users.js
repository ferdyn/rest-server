const { Router } = require('express');
const { check }  = require('express-validator');

const router = Router();

const { isRoleExist,
    isEmailExist,
    isIdExist 
} = require('../helpers/db-validators');

const { validateJWT,
    validateFields,
    isValidRole,
    isRoles
} = require('../middlewares');

const { getUsers,
    postUsers,
    puttUsers,
    deletetUsers,
    patchUsers 
} = require('../controllers/users');

//GET ROUTER
router.get('/', getUsers);

//POST ROUTER
router.post('/', [
    check( 'name', 'Required field').notEmpty(),
    check( 'email', 'That email is not valid').isEmail(),
    check( 'password', 'Required field').isLength({ min: 6 }),
    check( 'email' ).custom( isEmailExist ),
    check( 'role' ).custom( isRoleExist ),
    validateFields,
], postUsers);

//PUT ROUTER
router.put('/:id', [
    check('id', 'Not is valid ID').isMongoId(),
    check('id').custom( isIdExist ),
    check( 'role' ).custom( isRoleExist ),
    validateFields,
], puttUsers);

//DELETE ROUTER
router.delete('/:id', [
    validateJWT,
    // isValidRole,
    isRoles('ADMIN_ROLE', 'USER_ROLE', 'SALE_ROLE'),
    check('id', 'Not is valid ID').isMongoId(),
    check('id').custom( isIdExist ),
    validateFields,
],deletetUsers);

//PATCH ROUTER
router.patch('/', patchUsers);

module.exports = router;