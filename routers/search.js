const { Router } = require('express')

const { searchAll } = require('../controllers')

const router = Router()

router.get('/:colletion/:term', searchAll)

module.exports = router
