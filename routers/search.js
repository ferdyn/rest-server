const { Router } = require("express");
const { check }  = require('express-validator');

const { searchAll } = require("../controllers");
const { validateFields } = require("../middlewares");

const router = Router();

router.get('/:colletion/:term', searchAll);

module.exports = router;