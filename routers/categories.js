const { Router } = require('express');
const { check }  = require('express-validator');

const { postCategorie,
    getCategories,
    getCategorie,
    putCategorie,
    deleteCategorie 
} = require('../controllers');

const { isIdCategorieExist } = require('../helpers');

const { validateJWT,
    validateFields,
    isValidRole
} = require('../middlewares');

const router = Router();

//Get all ROUTER (Public)
router.get( '/', getCategories );

//Get one ROUTER (Public)
router.get( '/:id', [
    check('id', 'Not is valid ID').isMongoId(),
    check('id').custom( isIdCategorieExist ),
    validateFields
 ], getCategorie );

//POST ROUTER (Private) (Token valid)
router.post('/', [ 
    validateJWT,
    check('name', 'The name is required').notEmpty(),
    validateFields
], postCategorie );

//put ROUTER (Private) Token valid)
router.put('/:id', [ 
    validateJWT,
    check('id', 'Not is valid ID').isMongoId(),
    check('id').custom( isIdCategorieExist ),
    check('name', 'The name is required').notEmpty(),
    validateFields
], putCategorie);

//delete ROUTER (Private - Admin_role)
router.delete('/:id', [
    validateJWT,
    isValidRole,
    check('id', 'Not is valid ID').isMongoId(),
    check('id').custom( isIdCategorieExist ),
    validateFields,
], deleteCategorie);


module.exports = router;