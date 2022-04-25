const express = require('express');
const cors    = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor () {
        this.app      = express();
        this.port     = process.env.PORT;
        this.userPath = '/api/users';
        
        //Conecte to DDBB
        this.conectDB();

        //Middlewares
        this.middlewares();

        //Router of app
        this.routers();

    }

    async conectDB() {
        await dbConnection();
    }

    middlewares() {

        //CORS
        this.app.use( cors() );

        //Read y whirte of body
        this.app.use( express.json() );

        //Dir public
        this.app.use( express.static('public') );

    }

    routers() {
        this.app.use( this.userPath, require('../routers/users') );
    }

    listen() {

        this.app.listen( this.port, () => {
            console.log('Server runing on port ', this.port);
        })

    }

}

module.exports = Server;