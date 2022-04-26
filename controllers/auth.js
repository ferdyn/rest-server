const { request, response } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/user");
const { generateJWT } = require("../helpers/generate-jwt");

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

module.exports = {
    login
}