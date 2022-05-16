const { Router } = require('express')
const { check } = require('express-validator')
const {
  uploadsFiles,
  // updateFile,
  getFile,
  updateFileCloudinary
} = require('../controllers')
const { isColectionValid } = require('../helpers')
const { validateFields, validateFielUpload } = require('../middlewares')

const router = Router()

// POST ROUTER
router.post('/', validateFielUpload, uploadsFiles)

// PUT ROUTER
router.put(
  '/:colection/:id',
  [
    validateFielUpload,
    check('id', 'The id is not valid').isMongoId(),
    check('colection').custom(c => isColectionValid(c, ['users', 'products'])),
    validateFields
  ],
  // updateFile
  updateFileCloudinary
)

// GET ROUTER
router.get(
  '/:colection/:id',
  [
    check('id', 'The id is not valid').isMongoId(),
    check('colection').custom(c => isColectionValid(c, ['users', 'products'])),
    validateFields
  ],
  getFile
)

module.exports = router
