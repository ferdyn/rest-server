const { Router } = require('express');
const { check }  = require('express-validator');
const { getProducts,
    postProduct,
    getProduct,
    putProduct,
    deleteProduct
} = require('../controllers');

const { isIdProductExist } = require('../helpers');

const { validateJWT,
    validateFields,
    isValidRole
} = require('../middlewares');

const router = Router();

//Get all ROUTER (Public)
router.get('/', getProducts);

//Get one ROUTER (Public)
router.get('/:id', [
    check('id', 'Not is valid ID').isMongoId(),
    check('id').custom( isIdProductExist ),
    validateFields
 ], getProduct );

//Post ROUTER (Private) (Token valid)
router.post( '/', [ 
    validateJWT,
    check('name', 'The name is required').notEmpty(),
    check('categorie', 'The categorie is required').notEmpty(),
    validateFields
], postProduct );

//Put ROUTER (Private) (Token valid)
router.put('/:id', [ 
    validateJWT,
    check('id', 'Not is valid ID').isMongoId(),
    check('id').custom( isIdProductExist ),
    check('name', 'The name is required').notEmpty(),
    check('avalible', 'The avalible is not correct (true|false)').isBoolean(),
    check('price', 'The price is not correct (only number)').isNumeric(),
    validateFields
], putProduct);

//Delete ROUTER (Private - ADMIN_ROLE) (Token valid)
router.delete('/:id', [
    validateJWT,
    isValidRole,
    check('id', 'Not is valid ID').isMongoId(),
    check('id').custom( isIdProductExist ),
    validateFields,
], deleteProduct);

module.exports = router;