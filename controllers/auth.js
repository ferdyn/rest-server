const { request, response } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/user");

const {
 generateJWT,
 googleVerify
} = require('../helpers');

const login = async(req = request, res = response) => {

    const { email, password } = req.body;

    try {
        //Verify to email
        const user = await User.findOne({ email });
        if ( !user ) {
            return res.status(400).json({
                msg: 'The email / password is not correct - email'
            });
        }

        //User is active
        if ( !user.state  ) {
            return res.status(400).json({
                msg: 'The email / password is not correct - state'
            });
        }

        //Verify to password
        const validPassword = bcryptjs.compareSync( password, user.password );
        if ( !validPassword  ) {
            return res.status(400).json({
                msg: 'The email / password is not correct - password'
            });
        }

        //Generate JWT
        const token = await generateJWT( user.id );

        res.json({
            user,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Contact administrator'
        })        
    }

}

const googleSignIn = async( req, res = response ) => {

    const { id_token } = req.body;

    try {
        const googleUser = await googleVerify( id_token );
        console.log(googleUser);

        res.json({
            msg: `Todo bien!`,
            id_token
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'El Token no se pudo verificar'
        });
    }

}

module.exports = {
    login,
    googleSignIn
}