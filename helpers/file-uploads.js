const path = require('path')
const { v4: uuidv4 } = require('uuid')

const fileUpload = (
  files,
  extsValidates = ['png', 'jpg', 'jpeg', 'gif'],
  dir = ''
) => {
  return new Promise((resolve, reject) => {
    const { file } = files
    const nameFile = file.name.split('.')
    const extFile = nameFile[nameFile.length - 1]
    const newNameFile = uuidv4() + '.' + extFile
    if (!extsValidates.includes(extFile)) {
      // eslint-disable-next-line prefer-promise-reject-errors
      return reject(
        `The (${extFile}) ext file is not valida, only this [${extsValidates}]`
      )
    }

    const uploadPath = path.join(__dirname, '../uploads/', dir, newNameFile)

    file.mv(uploadPath, err => {
      if (err) {
        return reject(err)
      }

      resolve(newNameFile)
    })
  })
}

module.exports = {
  fileUpload
}
