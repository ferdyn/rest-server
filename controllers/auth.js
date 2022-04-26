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
        const { email, name, img } = await googleVerify( id_token );
        let user = await User.findOne({ email });
        
        if ( !user ) {
            
            const data = {
                name,
                email,
                password: ':P',
                img,
                //role: 'USER_ROLE',
                google: true
            }

            user = new User( data );
            await user.save();
            

        }

        //If user 
        if ( !user.state ) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            })
        }

        //Generate JWT
        const token = await generateJWT( user.id );

        

        res.json({
            user,
            token
        })

    } catch (error) {
        
        res.status(400).json({
            ok: false,
            msg: 'El Token no se pudo verificar',
            error
        });
    }

}

module.exports = {
    login,
    googleSignIn
}