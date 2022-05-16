const express = require('express')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const { dbConnection } = require('../database/config')

class Server {
  constructor () {
    this.app = express()
    this.port = process.env.PORT
    this.paths = {
      auth: '/api/auth',
      categories: '/api/categories',
      products: '/api/products',
      users: '/api/users',
      search: '/api/search',
      uploads: '/api/uploads'
    }

    // Conecte to DDBB
    this.conectDB()

    // Middlewares
    this.middlewares()

    // Router of app
    this.routers()
  }

  async conectDB () {
    await dbConnection()
  }

  middlewares () {
    // CORS
    this.app.use(cors())

    // Read y whirte of body
    this.app.use(express.json())

    // Dir public
    this.app.use(express.static('public'))

    // Upload file to server
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp/',
        createParentPath: true
      })
    )
  }

  routers () {
    this.app.use(this.paths.auth, require('../routers/auth'))
    this.app.use(this.paths.categories, require('../routers/categories'))
    this.app.use(this.paths.products, require('../routers/products'))
    this.app.use(this.paths.users, require('../routers/users'))
    this.app.use(this.paths.search, require('../routers/search'))
    this.app.use(this.paths.uploads, require('../routers/uploads'))
  }

  listen () {
    this.app.listen(this.port, () => {
      console.log('Server runing on port ', this.port)
    })
  }
}

module.exports = Server
