const mongoose = require('mongoose')
const { Schema } = mongoose

const productSchema = new Schema({
  name: String,
  rating: Number,
  timestamp: Date,
  variants: [{
    slug: String,
    name: String,
    images: [String],
    description: String,
    weight: Number,
    quantity: Number,
    soldQuantity: Number,
    wishlistCount: Number,
    price: Number,
    discount: Number,
  }],
  reviews: [{
    userId: String,
    rating: Number,
    content: String,
    image: String,
    timestamp: Date,
  }],
})

const Product = mongoose.model('product', productSchema)

module.exports = Product
