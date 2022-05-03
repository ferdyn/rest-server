const mongoose = require('mongoose')

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN)

    console.log('DDBB conected!!!')
  } catch (error) {
    console.log(error)
    throw new Error('Error to conected to DDBB')
  }
}

module.exports = {
  dbConnection
}
