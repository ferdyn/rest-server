const { Schema, model } = require('mongoose')

const ProductSchema = Schema({
  name: {
    type: String,
    required: [true, 'The name is required'],
    unique: true
  },
  state: {
    type: Boolean,
    default: true,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  price: {
    type: Number,
    default: 0
  },
  categorie: {
    type: Schema.Types.ObjectId,
    ref: 'Categorie',
    required: true
  },
  description: { type: String },
  avalible: { type: Boolean, default: true }
})

ProductSchema.methods.toJSON = function () {
  const { __v, state, ...data } = this.toObject()
  return data
}

module.exports = model('Product', ProductSchema)
