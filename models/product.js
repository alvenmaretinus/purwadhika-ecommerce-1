const mongoose = require('mongoose')
const { Schema } = mongoose

const productSchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  rating: { type: Number, default: 0 },
  timestamp: { type: Date, default: new Date() },
  variants: [{
    name: String,
    images: [String],
    description: { type: String, required: true },
    weight: { type: Number, required: true },
    quantity: { type: Number, required: true },
    soldQuantity: { type: Number, default: 0 },
    wishlistCount: { type: Number, default: 0 },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
  }],
  reviews: [{
    userId: { type: String, required: true },
    rating: { type: Number, required: true },
    content: { type: String, required: true },
    images: [String],
    timestamp: { type: Date, default: new Date() },
  }],
})

const Product = mongoose.model('product', productSchema)

module.exports = Product
