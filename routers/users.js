const { Router } = require('express');

const router = Router();

const { getUsers,
    postUsers,
    puttUsers,
    deletetUsers,
    patchUsers 
} = require('../controllers/users');

router.get('/', getUsers);

router.post('/', postUsers);

router.put('/:id', puttUsers);

router.delete('/', deletetUsers);

router.patch('/', patchUsers);

module.exports = router;