const { response } = require("express");
const { ObjectId  } = require('mongoose').Types;
const { User, Categorie, Product } = require("../models");

const colletionValid = [
    'users',
    'products',
    'categories',
    'roles'
];

//search USERS
const searchUsers = async( term = '', res = response ) => {

    const isMongoID = ObjectId.isValid( term )

    if ( isMongoID ) {
        const user = await User.findById( term );
        return res.json({
            results: ( user ) ? [ user ] : []
        });
    }

    const regex = new RegExp( term, 'i' );
    
    const users = await User.find({
        $or: [ { name: regex }, { email: regex } ],
        $and: [ { state: true }]
    });

    res.json({
        total: users.length,
        results: users
    });

}

//search CATEGORIES
const searchCategories =  async( term = '', res = response ) => {

    const isMongoID = ObjectId.isValid( term )

    if ( isMongoID ) {
        const categorie = await Categorie.findById( term );
        return res.json({
            results: ( categorie ) ? [ categorie ] : []
        });
    }

    const regex = new RegExp( term, 'i' );
    
    const categories = await Categorie.find( { name: regex, state: true } );

    res.json({
        total: categories.length,
        results: categories
    });

}


//search PRODUCTS
const searchProducts =  async( term = '', res = response ) => {

    const isMongoID = ObjectId.isValid( term )

    if ( isMongoID ) {
        const product = await Product.findById( term )
                            .populate( 'categorie', 'name' )
                            .populate( 'user', 'name' );
        return res.json({
            results: ( product ) ? [ product ] : []
        });
    }

    const regex = new RegExp( term, 'i' );
    
    const products = await Product.find({
        $or: [ { name: regex }, { description: regex } ],
        $and: [ { state: true }]
    })
    .populate( 'categorie', 'name' )
    .populate( 'user', 'name' );

    res.json({
        total: products.length,
        results: products
    });

}


const searchAll = async( req, res = response) => {

    const { colletion, term } = req.params;

    if( !colletionValid.includes(colletion) ) {
        return res.status(400).json({
            msg: `This colletion ${ colletion } is not valid, to try: ${ colletionValid }`
        });
    }


    switch (colletion) {
        case 'users':
            searchUsers( term, res );
            break;
        case 'products':
            searchProducts( term, res );
            break;
        case 'categories':
            searchCategories( term, res );    
            break;    
        default:
            res.status(500).json({
                msg: 'No está definida todavía la busqeuda'
            })
            break;
    }

}

module.exports = {
    searchAll
}