const { response } = require('express')
const fs = require('fs')
const path = require('path')

// Cloudinary configuration
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)

const { fileUpload } = require('../helpers')
const { User, Product } = require('../models')

// UPLOAD FILES
const uploadsFiles = async (req, res = response) => {
  try {
    const nameFile = await fileUpload(req.files, ['txt'], 'text')

    res.json({ nameFile })
  } catch (error) {
    res.status(400).json(error)
  }
}

// UPDATE FILES
const updateFile = async (req, res = response) => {
  const { colection, id } = req.params

  try {
    let model

    switch (colection) {
      case 'users':
        model = await User.findById(id)
        if (!model) {
          return res.status(400).json({
            msg: `The user width id ${id} is not valid`
          })
        }
        break
      case 'products':
        model = await Product.findById(id)
        if (!model) {
          return res.status(400).json({
            msg: `The product width id ${id} is not valid`
          })
        }

        break
      default:
        return res.status(500).json({
          msg: 'The colection is not definit'
        })
    }

    // Delete file
    if (model.img) {
      // Delete file for type colection
      const imgPath = path.join(__dirname, '../uploads', colection, model.img)
      if (fs.existsSync(imgPath)) {
        fs.unlinkSync(imgPath)
      }
    }

    const img = await fileUpload(
      req.files,
      ['png', 'jpg', 'jpeg', 'gif'],
      colection
    )

    model.img = img
    await model.save()

    res.json(model)
  } catch (error) {
    res.status(400).json(error)
  }
}

// UPDATE FILES CLOUDINARY
const updateFileCloudinary = async (req, res = response) => {
  const { colection, id } = req.params

  try {
    let model

    switch (colection) {
      case 'users':
        model = await User.findById(id)
        if (!model) {
          return res.status(400).json({
            msg: `The user width id ${id} is not valid`
          })
        }
        break
      case 'products':
        model = await Product.findById(id)
        if (!model) {
          return res.status(400).json({
            msg: `The product width id ${id} is not valid`
          })
        }

        break
      default:
        return res.status(500).json({
          msg: 'The colection is not definit'
        })
    }

    // Delete file
    if (model.img) {
      // Delete file for type colection
      const fileArr = model.img.split('/')
      const fileName = fileArr[fileArr.length - 1]
      const [publicId] = fileName.split('.')
      cloudinary.uploader.destroy(publicId)
    }

    const { file } = req.files
    const { secure_url: secureURL } = await cloudinary.uploader.upload(
      file.tempFilePath
    )
    model.img = secureURL
    await model.save()

    res.json(model)
  } catch (error) {
    res.status(400).json(error)
  }
}

// GET FILES
const getFile = async (req, res = response) => {
  const { colection, id } = req.params
  const notFoud = path.join(__dirname, '../assets/no-image.jpg')
  let model

  switch (colection) {
    case 'users':
      model = await User.findById(id)
      if (!model) {
        return res.status(400).json({
          msg: `The user width id ${id} is not valid`
        })
      }
      break
    case 'products':
      model = await Product.findById(id)
      if (!model) {
        return res.status(400).json({
          msg: `The product width id ${id} is not valid`
        })
      }

      break
    default:
      return res.status(500).json({
        msg: 'The colection is not definit'
      })
  }

  // Show img
  if (model.img) {
    // Show file for type colection
    const imgPath = path.join(__dirname, '../uploads', colection, model.img)
    if (fs.existsSync(imgPath)) {
      return res.sendFile(imgPath)
    }
  }

  res.sendFile(notFoud)
}

module.exports = {
  uploadsFiles,
  updateFile,
  getFile,
  updateFileCloudinary
}
