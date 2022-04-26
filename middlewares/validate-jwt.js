const { response,request } = require("express")
const jwt = require('jsonwebtoken');

const User = require('../models/user');


const validateJWT = async( req = request, res = response, next) => {

    const token = req.header( 'x-token' );

    if ( !token ) {
        return res.status(401).json({
            msg: 'Not found token'
        });        
    }

   try {
       
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );
        
        //Get user authenticated
        const userAuth = await User.findById( uid );

        if ( !userAuth ) {
            return res.status(401).json({
                msg: 'Token is not valid - not exist user'
            })
        }

        if ( !userAuth.state ) {
            return res.status(401).json({
                msg: 'Token is not valid - state is false'
            })
        }
        
        req.user = userAuth;
        next();

   } catch (error) {
       console.log(error);
       res.status(401).json({
           msg: 'Token is not valid'
       })
   }
}

module.exports = {
    validateJWT
}