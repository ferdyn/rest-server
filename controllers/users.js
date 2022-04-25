const { request, response } = require('express');

const getUsers = ( req = request, res = response ) => {

    console.log(req.query);
    const { q, name = 'No name', apikey:apiKey, page = 1, limit}  = req.query;

    res.json( {
        msg: 'get API - controllers',
        q,
        name,
        apiKey,
        page,
        limit
    } )
}

const postUsers = ( req = request, res = response ) => {

    const { name, age } = req.body;

    res.json( {
      msg: 'post API - controllers',
      name,
      age  
    } );
}

const puttUsers = ( req = request, res = response ) => {

    const { id } = req.params;

    res.json( { 
        msg: 'put API - controllers',
        id
    } )
}

const deletetUsers = ( req = request, res = response ) => {
    res.json( { 
        msg: 'delete API - controllers'
    } )
}

const patchUsers = ( req = request, res = response ) => {
    res.json( { 
        msg: 'patch API - controllers'
    } )
}

module.exports = {
    getUsers,
    postUsers,
    puttUsers,
    deletetUsers,
    patchUsers
}